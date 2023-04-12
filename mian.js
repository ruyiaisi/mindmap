
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>思维导图</title>
    <style>
        /* 设置网页的样式 */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        #container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #mindmap {
            width: 80%;
            height: 80%;
            border: 1px solid black;
        }

        .node {
            fill: white;
            stroke: black;
            cursor: pointer;
        }

        .node:hover {
            fill: lightgray;
        }

        .node-text {
            font-size: 12px;
            text-anchor: middle;
            dominant-baseline: central;
        }

        .link {
            fill: none;
            stroke: gray;
        }

        .box {
  min-width: 20px;
  max-width: 100px;
  height: auto;
  padding: 10px;
  border: 1px solid black;
}
    </style>
</head>
<body>
    <div id="container">
        <!-- 创建一个svg元素，用于显示思维导图 -->
        <svg id="mindmap"></svg>
    </div>
    <!-- 引入d3.js库 -->
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <!-- 引入自定义的js文件 -->
    <script src="mian.js"></script>
</body>
</html>
