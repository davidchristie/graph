function Graph() {

  // PRIVATE VARIABLES

  // The edges incident to each node.
  var edgeList = new Map() // Map<NODE, Set<EDGE>>

  // All edges in the graph.
  var edges = new Map() // Map<EDGE, VALUE>

  // The out node of each edge.
  var endNode = new Map() // Map<EDGE, NODE>

  // The incoming edges of each node.
  var inEdges = new Map() // Map<NODE, Set<EDGE>>

  // The next edge.
  var nextEdge = 0

  // The next node.
  var nextNode = 0

  // All nodes in the graph.
  var nodes = new Map() // Map<NODE, VALUE>

  // The outgoing edges of each node.
  var outEdges = new Map() // Map<NODE, Set<EDGE>>

  // The in node of each edge.
  var startNode = new Map() // Map<EDGE, NODE>

  // PRIVATE METHODS

  var addEdgeToNodeMap = function(edge, node, map) {
    if (!map.has(node))
      map.set(node, new Set())
    map.get(node).add(edge)
  }

  var getEdgesFromNodeMap = function(node, map) {
    if (map.has(node))
      return Array.from(map.get(node).values())
    else
      return []
  }

  var removeEdgeFromNodeMap = function(edge, node, map) {
    map.get(node).delete(edge)
    if (map.get(node).size === 0)
      map.delete(node)
  }

  var requireExistingEdge = function(edge) {
    if (!edges.has(edge))
      throw new Error('Edge not found: ' + edge)
  }

  var requireExistingNode = function(node) {
    if (!nodes.has(node))
      throw new Error('Node not found: ' + node)
  }

  // PUBLIC METHODS

  // Add an edge to the graph.
  this.addEdge = function(start, end, value) {
    requireExistingNode(start)
    requireExistingNode(end)

    var edge = nextEdge++

    edges.set(edge, value)
    startNode.set(edge, start)
    endNode.set(edge, end)

    addEdgeToNodeMap(edge, start, edgeList)
    addEdgeToNodeMap(edge, start, outEdges)
    addEdgeToNodeMap(edge, end, edgeList)
    addEdgeToNodeMap(edge, end, inEdges)

    return edge
  }

  // Add a node to the graph.
  this.addNode = function(value) {
    var node = nextNode++
    nodes.set(node, value)
    return node
  }

  // Return edges incident to the node.
  this.edgeList = function(node) {
    requireExistingNode(node)
    return getEdgesFromNodeMap(node, edgeList)
  }

  // Return all edges in the graph.
  this.edges = function() {
    return Array.from(edges.keys())
  }

  // Return the end node of the edge.
  this.endNode = function(edge) {
    requireExistingEdge(edge)
    return endNode.get(edge)
  }

  // Return the value of the edge.
  this.getEdgeValue = function(edge) {
    requireExistingEdge(edge)
    return edges.get(edge)
  }

  // Return the value of the node.
  this.getNodeValue = function(node) {
    requireExistingNode(node)
    return nodes.get(node)
  }

  // Checks if edge is in the graph.
  this.hasEdge = function(edge) {
    return edges.has(edge)
  }

  // Checks if node is in the graph.
  this.hasNode = function(node) {
    return nodes.has(node)
  }

  // Return the incoming edges of the node.
  this.inEdges = function(node) {
    requireExistingNode(node)
    return getEdgesFromNodeMap(node, inEdges)
  }

  // Return all nodes in the graph.
  this.nodes = function() {
    return Array.from(nodes.keys())
  }

  // Return the outgoing edges of the node.
  this.outEdges = function(node) {
    requireExistingNode(node)
    return getEdgesFromNodeMap(node, outEdges)
  }

  // Remove edge from the graph.
  this.removeEdge = function(edge) {
    requireExistingEdge(edge)

    var start = startNode.get(edge)
    var end = endNode.get(edge)

    edges.delete(edge)
    startNode.delete(edge)
    endNode.delete(edge)

    removeEdgeFromNodeMap(edge, start, edgeList)
    removeEdgeFromNodeMap(edge, start, outEdges)
    removeEdgeFromNodeMap(edge, end, edgeList)
    removeEdgeFromNodeMap(edge, end, inEdges)
  }

  // Remove node from the graph.
  this.removeNode = function(node) {
    requireExistingNode(node)

    // Remove any incident edges.
    for (let edge of this.edgeList(node))
      this.removeEdge(edge)

    // Remove the node.
    nodes.delete(node)
  }

  // Set the value of the edge.
  this.setEdgeValue = function(edge, value) {
    requireExistingEdge(edge)
    edges.set(edge, value)
  }

  // Set the value of the node.
  this.setNodeValue = function(node, value) {
    requireExistingNode(node)
    nodes.set(node, value)
  }

  // Return the starting node of the edge.
  this.startNode = function(edge) {
    requireExistingEdge(edge)
    return startNode.get(edge)
  }

}

Graph.prototype.edgeListValues = function(node) {
  return this.edgeList(node).map(this.getEdgeValue)
}

Graph.prototype.edgeValues = function() {
  return this.edges().map(this.getEdgeValue)
}

Graph.prototype.endNodeValue = function(edge) {
  return this.getNodeValue(this.endNode(edge))
}

Graph.prototype.inEdgeValues = function(node) {
  return this.inEdges(node).map(this.getEdgeValue)
}

Graph.prototype.nodeValues = function() {
  return this.nodes().map(this.getNodeValue)
}

Graph.prototype.outEdgeValues = function(node) {
  return this.outEdges(node).map(this.getEdgeValue)
}

Graph.prototype.startNodeValue = function(edge) {
  return this.getNodeValue(this.startNode(edge))
}
