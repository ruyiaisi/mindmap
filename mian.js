// //创建一个思维导图节点类
// class Node {
//     constructor() {
//         //根据已有的id号，生成一个新的id号
//         this.id = Date.now();
//         //添加属性 ：标题，文本，父节点，子节点，连接，其他数据
//         this.title = "";
//         this.text = "";
//         this.parent = null;
//         this.children = [];
//         this.connections = [];
//         this.other = {};
//         // 添加属性层级
//         this.level = null;
//     }
// }








// var nodes = [];
// // 生成一个根节点，层级为0
// var root = new Node();
// root.level = 0;
// // 将根节点添加到节点数组中去
// nodes.push(root);


// //生成测试用的节点
// var node1 = new Node();
// var node2 = new Node();
// var node3 = new Node();
// var node4 = new Node();
// var node5 = new Node();
// var node6 = new Node();
// var node7 = new Node();
// var node8 = new Node();
// var node9 = new Node();
// // 节点建立层级关系
// node1.level = 1;
// node2.level = 1;
// node3.level = 1;
// node4.level = 2;
// node5.level = 2;
// node6.level = 2;
// node7.level = 2;
// node8.level = 2;
// node9.level = 2;
// // 将节点添加到节点数组中去
// nodes.push(node1);
// nodes.push(node2);
// nodes.push(node3);
// nodes.push(node4);
// nodes.push(node5);
// nodes.push(node6);
// nodes.push(node7);
// nodes.push(node8);
// nodes.push(node9);
// // 节点之间 建立父子节点关系
// node1.parent = root;
// node2.parent = root;
// node3.parent = root;

// node4.parent = node1;
// node5.parent = node1;
// node6.parent = node2;
// node7.parent = node2;
// node8.parent = node3;
// node9.parent = node3;
// root.children.push(node1);
// root.children.push(node2);
// root.children.push(node3);
// node1.children.push(node4);
// node1.children.push(node5);
// node2.children.push(node6);
// node2.children.push(node7);
// node3.children.push(node8);
// node3.children.push(node9);
// node2.connections.push(node8);
// node8.connections.push(node2);


// //创建一个思维导图画布并在html中显示出来，背景颜色为灰色，实线边框为灰色
// var svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%");

// // 创建一个思维导图画布用g
// var g = svg.append("g").attr("width", "100%").attr("height", "100%");

// // 创建一个方法，将nodes中的节点在画布中画出
// function draw(nodes) {
//     // 先清空画布
//     g.selectAll("*").remove();
//     // 循环遍历nodes数组中的节点，将它们添加到画布中
//     nodes.forEach(function (node) {
//         // 创建一个新的节点
//         var node = new Node();
//         // 将节点添加到画布中
//         g.append("g").attr("transform", "translate(" + node.x + "," + node.y + ")");

//     })

// }
// draw(nodes);



// 创建一个节点类，属性包含id，title，text，parent，children，connections，other
class Node {
    constructor(id, title, text, parent = null, children = [], connections = [], other = {}) {
        this.id = id; // 节点的唯一标识符
        this.title = title; // 节点的标题
        this.text = text; // 节点的文本内容
        this.parent = parent; // 节点的父节点
        this.children = children; // 节点的子节点数组
        this.connections = connections; // 节点的连接节点数组
        this.other = other; // 节点的其他属性对象
    }
}

// 创建一个思维导图类，属性包含root，nodes，links
class MindMap {
    constructor(root) {
        this.root = root; // 思维导图的根节点
        this.nodes = [root]; // 思维导图的所有节点数组
        this.links = []; // 思维导图的所有连接数组
    }

    // 添加一个节点到思维导图中，指定父节点和连接节点
    addNode(node, parent, connections = []) {
        node.parent = parent; // 设置节点的父节点
        parent.children.push(node); // 将节点添加到父节点的子节点数组中
        node.connections = connections; // 设置节点的连接节点数组
        for (let connection of connections) {
            connection.connections.push(node); // 将节点添加到连接节点的连接节点数组中
            this.links.push({ source: node, target: connection }); // 将连接添加到思维导图的连接数组中
        }
        this.nodes.push(node); // 将节点添加到思维导图的节点数组中
    }

    // 删除一个节点从思维导图中，同时删除其子孙节点和相关连接
    deleteNode(node) {
        let index = this.nodes.indexOf(node); // 找到节点在思维导图的节点数组中的索引
        if (index > -1) {
            this.nodes.splice(index, 1); // 从思维导图的节点数组中删除该节点
            let parent = node.parent; // 获取该节点的父节点
            if (parent) {
                index = parent.children.indexOf(node); // 找到该节点在父节点的子节点数组中的索引
                if (index > -1) {
                    parent.children.splice(index, 1); // 从父节点的子节点数组中删除该节点
                }
            }
            let connections = node.connections; // 获取该节点的连接节点数组
            for (let connection of connections) {
                index = connection.connections.indexOf(node); // 找到该节点在连接节点的连接节点数组中的索引
                if (index > -1) {
                    connection.connections.splice(index, 1); // 从连接节点的连接节点数组中删除该节点
                }
                index = this.links.findIndex(link => link.source === node && link.target === connection); // 找到该节点和连接节点之间的连接在思维导图的连接数组中的索引
                if (index > -1) {
                    this.links.splice(index, 1); // 从思维导图的连接数组中删除该连接
                }
            }
            let children = node.children; // 获取该节点的子节点数组
            for (let child of children) {
                this.deleteNode(child); // 递归地删除该节点的所有子孙节点
            }
        }
    }

    // 更新一个节点的属性，指定要更新的属性对象
    updateNode(node, props) {
        Object.assign(node, props); // 使用Object.assign方法将属性对象合并到节点对象中
    }

    // 渲染思维导图到指定的svg元素中，指定宽度和高度
    render(svg, width, height) {
        let g = svg.append("g") // 在svg元素中添加一个g元素，用于存放思维导图的元素
            .attr("transform", `translate(${width / 2}, ${height / 2})`); // 将g元素平移到svg元素的中心

        let tree = d3.tree() // 创建一个树形布局生成器，用于计算思维导图的节点和连接的位置
            .size([2 * Math.PI, Math.min(width, height) / 2 - 100]); // 设置树形布局的大小为圆形

        let root = d3.hierarchy(this.root) // 创建一个层次结构对象，用于表示思维导图的根节点及其后代
            .sum(d => d.children.length) // 设置每个节点的值为其子节点的数量
            .sort((a, b) => b.value - a.value); // 按照每个节点的值降序排列

        tree(root); // 应用树形布局生成器到层次结构对象上，计算每个节点和连接的位置

        let link = g.selectAll(".link") // 选择g元素中所有类名为link的元素，即思维导图的连接
            .data(root.links()) // 绑定数据为层次结构对象的所有连接
            .enter().append("path") // 对于每个数据元素，添加一个path元素
            .attr("class", "link") // 设置类名为link
            .attr("d", d3.linkRadial() // 设置路径生成器为径向路径生成器，用于创建弧形路径
                .angle(d => d.x) // 设置角度属性为数据元素的x属性，即弧形路径的起始和结束角度
                .radius(d => d.y)); // 设置半径属性为数据元素的y属性，即弧形路径距离圆心的距离

        let node = g.selectAll(".node") // 选择g元素中所有类名为node的元素，即思维导图的节点
            .data(root.descendants()) // 绑定数据为层次结构对象的所有后代节点
            .enter().append("g") // 对于每个数据元素，添加一个g元素
            .attr("class", "node") // 设置类名为node
            .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y}, 0)`); // 将g元素旋转和平移到对应的位置

        node.append("circle") // 在每个g元素中添加一个circle元素，用于表示节点的形状
            .attr("r", 10) // 设置圆的半径为10
            .attr("fill", "white") // 设置圆的填充颜色为白色
            .attr("stroke", "black"); // 设置圆的描边颜色为黑色

        node.append("text") // 在每个g元素中添加一个text元素，用于表示节点的标题
            .attr("class", "node-text") // 设置类名为node-text
            .attr("dy", "0.31em") // 设置垂直偏移量为0.31em
            .attr("x", d => d.x < Math.PI === !d.children ? 12 : -12) // 设置水平位置为根据节点的角度和是否有子节点决定
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end") // 设置文本对齐方式为根据节点的角度和是否有子节点决定
            .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null) // 设置旋转角度为根据节点的角度决定
            .text(d => d.data.title); // 设置文本内容为数据元素的title属性
    }
}

// 获取svg元素，并设置宽度和高度
let svg = d3.select("#mindmap")
    .attr("width", 800)
    .attr("height", 600);

// 创建一个思维导图对象，并设置根节点
let mindmap = new MindMap(new Node(1, "思维导图", "这是一个思维导图软件"));

// 添加一些节点到思维导图中，指定父节点和连接节点
mindmap.addNode(new Node(2, "功能", "思维导图软件的功能"), mindmap.root);
mindmap.addNode(new Node(3, "优点", "思维导图软件的优点"), mindmap.root);
mindmap.addNode(new Node(4, "缺点", "思维导图软件的缺点"), mindmap.root);
mindmap.addNode(new Node(5, "创建", "可以创建思维导图"), mindmap.nodes[1]);
mindmap.addNode(new Node(6, "编辑", "可以编辑思维导图"), mindmap.nodes[1]);
mindmap.addNode(new Node(7, "保存", "可以保存思维导图"), mindmap.nodes[1]);
mindmap.addNode(new Node(8, "分享", "可以分享思维导图"), mindmap.nodes[1], [mindmap.nodes[2]]);
mindmap.addNode(new Node(9, "直观", "可以直观地展示信息"), mindmap.nodes[2]);
mindmap.addNode(new Node(10, "灵活", "可以灵活地组织信息"), mindmap.nodes[2]);
mindmap.addNode(new Node(11, "高效", "可以高效地处理信息"), mindmap.nodes[2]);
mindmap.addNode(new Node(12, "复杂", "可能会变得复杂难懂"), mindmap.nodes[3]);
mindmap.addNode(new Node(13, "局限", "可能会受到局限影响"), mindmap.nodes[3]);

// 渲染思维导图到svg元素中，指定宽度和高度
mindmap.render(svg, 800, 600);


        // ![Mind map](https://i.imgur.com/5yjwZyL.png)