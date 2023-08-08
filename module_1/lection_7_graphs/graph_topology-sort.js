// Топологическая сортировка
class TreeNode {
    constructor(value, siblings = []) {
        this.value = value,
        this.siblings = siblings
    }

    traverse(cb) {
        const queue = new Set()

        function innerTraverse(node) {
            node.siblings.forEach((node) => {
                innerTraverse(node)
            })

            if(!queue.has(node)) {
                queue.add(node.value)
            }
        }

        innerTraverse(this)
        console.log(...queue);
    }
}

const tree = new TreeNode(
    1,
    [
        new TreeNode(2, [new TreeNode(3)]),
        new TreeNode(4, [new TreeNode(5)])
    ]
)

tree.traverse(console.log)