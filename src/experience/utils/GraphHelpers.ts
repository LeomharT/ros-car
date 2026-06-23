import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
} from 'three';
import * as YUKA from 'yuka';

type Node = YUKA.Node & {
  position: YUKA.Vector3;
};

/**
 * @author Mugen87 / https://github.com/Mugen87
 */

function createGraphHelper(
  graph: YUKA.Graph,
  nodeSize = 1,
  nodeColor = 0x4e84c4,
  edgeColor = 0xffffff,
) {
  const group = new Group();

  // nodes

  const nodeMaterial = new MeshBasicMaterial({ color: nodeColor });
  const nodeGeometry = new IcosahedronGeometry(nodeSize, 2);

  const nodes: Node[] = [];

  graph.getNodes(nodes);

  for (let node of nodes) {
    const nodeMesh = new Mesh(nodeGeometry, nodeMaterial);
    nodeMesh.position.copy(node.position);
    nodeMesh.userData.nodeIndex = node.index;

    nodeMesh.matrixAutoUpdate = false;
    nodeMesh.updateMatrix();

    group.add(nodeMesh);
  }

  // edges

  const edgesGeometry = new BufferGeometry();
  const position = [];

  const edgesMaterial = new LineBasicMaterial({ color: edgeColor });

  const edges: YUKA.Edge[] = [];

  for (let node of nodes) {
    graph.getEdgesOfNode(node.index, edges);

    for (let edge of edges) {
      const fromNode = graph.getNode(edge.from) as Node;
      const toNode = graph.getNode(edge.to) as Node;

      position.push(fromNode.position.x, fromNode.position.y, fromNode.position.z);
      position.push(toNode.position.x, toNode.position.y, toNode.position.z);
    }
  }

  edgesGeometry.setAttribute('position', new Float32BufferAttribute(position, 3));

  const lines = new LineSegments(edgesGeometry, edgesMaterial);
  lines.matrixAutoUpdate = false;

  group.add(lines);

  return group;
}

export { createGraphHelper };
