// Обход в глубину
class TreeNode {
    constructor(value, siblings = []) {
        this.value = value,
        this.siblings = siblings
    }

    traverse(cb, visited = new Set()) {
        // проверка был ли посещен узел
        if (visited.has(this)) {
            return
        }

        visited.add(this)
        cb(this.value)
        this.siblings.forEach((node) => {
            node.traverse(cb)
        })
    }
}

const tree = new TreeNode(
    1,
    [new TreeNode(
        2, 
        [new TreeNode(3)]
    )]
)

tree.traverse(console.log)