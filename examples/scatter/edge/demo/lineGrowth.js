import G6 from '@antv/g6';

G6.registerEdge('line-growth', {
  afterDraw(cfg, group) {
    const shape = group.get('children')[0];
    const length = shape.getTotalLength();
    shape.animate({
      // 动画重复
      repeat: true,
      // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
      onFrame(ratio) {
        const startLen = ratio * length;
        // 计算线的lineDash
        const cfg = {
          lineDash: [ startLen, length - startLen ]
        };
        return cfg;
      }
    }, 2000);  // 一次动画的时长为 2000
  }
}, 'cubic');   // 该自定义边继承了内置三阶贝塞尔曲线边 cubic

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: '节点1',
    labelCfg: {
      position: 'top'
    }
  }, {
    id: 'node2',
    x: 300,
    y: 200,
    color: '#40a9ff',
    label: '节点2',
    labelCfg: {
      position: 'left',
      offset: 10
    }
  }],
  edges: [{
    source: 'node1',
    target: 'node2'
  }
  ]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultNode: {
    size: 45,
    style: {
      fill: '#82affc'
    }
  },
  defaultEdge: {
    shape: 'line-growth',
    style: {
      lineWidth: 2,
      stroke: '#bae7ff'
    }
  }
});
graph.data(data);
graph.render();
