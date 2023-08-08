// Обход в ширину
class TreeNode {
    constructor(value, siblings = []) {
        this.value = value,
        this.siblings = siblings
    }

    traverse(cb) {
        const queue = [this]

        while(queue.length > 0) {
            const head = queue.shift()

            cb(head.value);

            head.siblings.forEach((node) => {
                queue.push(node)
            })
        }


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