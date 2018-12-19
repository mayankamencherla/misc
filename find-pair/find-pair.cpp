#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>

using namespace std;

class Item
{
    private:
        /**
         * The name of the item
         * @param string name
         */
        string name;

        /**
         * The cost of the item in cents
         * @param int cost
         */
        int cost;

    public:
        Item(string n, int c)
        {
            this->name = n;

            this->cost = c;
        }

        /**
         * The name of the item
         * @return string
         */
        string getName()
        {
            return this->name;
        }

        /**
         * The cost of the item in cents
         * @return int
         */
        int getCost()
        {
            return this->cost;
        }

        /**
         * Prints the item in a human readable way
         * @return void
         */
        void print()
        {
            printf("Name: %s, Cost: %d\n", this->getName().c_str(), this->getCost());
        }
};

/**
 * Takes in a file in csv format: {name, price}
 * Returns an array of item pointers
 *
 * @param string filename
 * @return vector<Item*>
 */
vector<Item*> getItems(string filename)
{
    ifstream file;

    file.open(filename);

    string line;

    vector<Item*> prices;

    while (true)
    {
        if (!getline(file, line)) break;

        string name; string cost;

        stringstream ss(line);

        getline(ss, name, ',');

        getline(ss, cost);

        Item* i = new Item(name, stoi(cost));

        prices.push_back(i);
    }

    file.close();

    return prices;
}

/**
 * Prints the items in the prices array
 * @param vector<Item*>& prices
 * @return void
 */
void printItems(vector<Item*>& prices)
{
    printf("\nThere are %zu elements in the prices array\n\n", prices.size());

    for (Item* i : prices)
    {
        i->print();
    }

    printf("\n----------------------------------------------\n");
}

/**
 * Gets the 2 items whose sum is closest to balance (<= balance)
 * @param vector<Item*>& prices
 * @param int balance
 * @return vector<Item*>
 */
vector<Item*> getClosestItems(vector<Item*>& prices, int balance)
{
    vector<Item*> res;

    // There are not enough items, or the items of lowest value are too expensive
    if (prices.size() < 2 || prices[0]->getCost() + prices[1]->getCost() > balance) return res;

    int best = 0;

    for (int i=0; i<prices.size()-1; i++)
    {
        int target = balance - prices[i]->getCost();

        int left = i+1; int right = prices.size()-1;

        while (left <= right)
        {
            int mid = (left + right)/2;

            int p = prices[mid]->getCost();

            // We found a way to buy 2 items for the entire balance amount
            if (p == target) return {prices[i], prices[mid]};

            else if (p < target)
            {
                int solution = prices[i]->getCost() + prices[mid]->getCost();

                // We found a solution within the budget that is closer to the budget
                if (best < solution)
                {
                    best = solution;

                    res = {prices[i], prices[mid]};
                }

                left = mid+1;
            }

            else
            {
                // There exists no solution from {mid, right}
                right = mid-1;
            }
        }
    }

    return res;
}

/**
 * Takes in budget of the user as input
 * @return int balance
 */
int getBudgetAsUserInput()
{
    int balance;

    cout << "\n\nPlease enter an amount as the budget for the 2 presents: ....\n\n" << endl;

    cin >> balance;

    printf("\n----------------------------------------------\n");

    return balance;
}

int main()
{
    vector<Item*> prices = getItems("prices.txt");

    printItems(prices);

    int balance = getBudgetAsUserInput();

    vector<Item*> closest = getClosestItems(prices, balance);

    if (closest.size() == 0)
    {
        printf("\nThere is no possible solution to this set of items with the given budget\n\n");
    }
    else
    {
        printItems(closest);
    }
}
