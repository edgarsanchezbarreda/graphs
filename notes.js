// Graphs

// Graphs are like trees, except they can contain loops
// This means they can have connection to many nodes, even nodes that are not direct children.

// Vertex -> node
// Edge or Arc -> Connection between two nodes
// Adjacent -> if two nodes share an edge
// Weight(optional) -> Some type of measurement as to how nodes are connected.

// 1. Graph Examples

//	-  An example of a graph is a Directed Graph.
// Think of a food chain in the ocean, where the Orca is at the top of the food chain.
// There are other animals that an orca can eat, so there is an arc(connection) between those two animals, where the arc is directed only towards that animal that is eaten between the two nodes that are connected.
// I.E. There is an arc connecting the orca to a penguin, meaning the orca can eat the penguin, but not vice versa

//	- Another example is a undirected Graph
// Think of a list of Facebook Friends
// When two people follow eachother, two people have an arc(connection) between them, so both of them can utilize that connection.

// Remember that there is something called an adjancency list - which contains all the nodes that are directly connected to the said node in question.
// Example, all my Instagram friends would be in my adjacency list, but the friends of my friends would not be

// 2. Weights

// - Specified information/data about each edge(connection)
// -> for example, you can have a airline route graph, where there are multiple edges from on city to another, but the different routes have different prices(weights) depending on the route.

// Graphs are often used to model relationships between things
// Trees are directed, acyclic graphs
// Meaning that trees can only go one direction, while graphs can go many directions

// 3. Representing Graphs

// - Adjacency List -> for each node, a list of every node it is directly connected to
// - Adjacency Matrix -> A matrix of every pair of nodes, with a 1 if that pair is connected (otherwise 0)

// 4. Node Class

// class PersonNode {
//     constructor(name) {
//         this.name = name;
//         this.adjacent = [];
//     }
// }

// const homer = new PersonNode('homer simpson');
// const marge = new PersonNode('marge simpson');

// homer.adjacent.push(marge);
// marge.adjacent.push(homer);

// The above class works, but the problem with using an array as the adjacency list is that you can have duplicates, which is not good for this case.
// The answer is to use a set!

// class PersonNode {
//     costructor(name, adjacent = new Set()) {
//         this.name = name;
//         this.adjacent = adjacent;
//     }
// }

// const homer = new PersonNode('homer simpson');
// const marge = new PersonNode('marge simpson');
// const maggie = new PersonNode('maggie simpson');

// homer.adjacent.add(marge);
// marge.adjacent.add(homer);
// maggie.adjacent.add(marge);
// maggie.adjacent.add(homer);
// homer.adjacent.add(maggie);
// marge.adjacent.add(maggie);

// This works, but it is not very efficient because you have to manually add each edge both ways, which requires a lot of attention to detail and more code.
// --------------------------------

class PersonNode {
    constructor(name, adjacent = new Set()) {
        this.name = name;
        this.adjacent = adjacent;
    }
}

class FriendGraph {
    constructor() {
        this.nodes = new Set();
    }

    addPerson(node) {
        this.nodes.add(node);
    }

    addPeople(peopleList) {
        for (let node of peopleList) {
            this.addPerson(node);
        }
    }

    setFriends(person1, person2) {
        person1.adjacent.add(person2);
        person2.adjacent.add(person1);
    }

    // Breadth First Search Approach
    areConnectedBFS(person1, person2) {
        let toVisitQueue = [person1];
        let seen = new Set(toVisitQueue);

        while (toVisitQueue.length) {
            let currentPerson = toVisitQueue.shift();
            console.log(currentPerson.name);

            if (currentPerson === person2) return true;

            for (let neighbor of currentPerson.adjacent) {
                if (!seen.has.neighbor) {
                    toVisitQueue.push(neighbor);
                    seen.add(neighbor);
                }
            }
        }
        return false;
    }

    // Depth First Search Approach
    areConnectedDFS(person1, person2) {
        let toVisitStack = [person1];
        let seen = new Set(toVisitStack);

        while (toVisitStack.length) {
            let currentPerson = toVisitStack.pop();
            console.log(currentPerson.name);

            if (currentPerson === person2) return true;

            for (let neighbor of currentPerson.adjacent) {
                if (!seen.has.neighbor) {
                    toVisitStack.push(neighbor);
                    seen.add(neighbor);
                }
            }
        }
        return false;
    }

    areConnectedRecursive(person1, person2, seen = new Set([person1])) {
        if (person1 === person2) return true;

        for (let neighbor of person1.adjacent) {
            if (!seen.has(neighbor)) {
                seen.add(neighbor);
                if (this.areConnectedRecursive(neighbor, person2, seen)) {
                    return true;
                }
            }
        }
        return false;
    }
}

const homer = new PersonNode('homer simpson');
const marge = new PersonNode('marge simpson');
const maggie = new PersonNode('maggie simpson');
const lisa = new PersonNode('lisa simpson');
const grandpa = new PersonNode('grandpa simpson');

const friends = new Graph();
friends.addVertices([homer, marge, maggie, lisa, grandpa]);
friends.addEdge(homer, marge);
friends.addEdge(homer, lisa);
friends.addEdge(homer, maggie);
friends.addEdge(marge, maggie);
friends.addEdge(maggie, lisa);
friends.addEdge(lisa, grandpa);

// 5. Traversing Graph

// Starting with a Breadth First Search(BFS)

// First we are going to create an island in this graph

const moe = new Node('moe');
const barney = new Node('barney');
const lenny = new Node('lenny');
friends.addVertices([moe, barney, lenny]);
friends.addEdge(moe, barney);
friends.addEdge(barney, lenny);

// We added the "areConnected" helper method to the class to return true if two people are connected, and false if not.
// This approach is a breadth first search
