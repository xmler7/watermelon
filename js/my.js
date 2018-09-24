enchant();

const tile_size        = 104;
const screen_col_count = 6;
const screen_row_count = 7;
const screen_width     = tile_size * screen_col_count;
const screen_height    = tile_size * screen_row_count;
const image_file       = "img/tile.svg";

const my_map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

window.addEventListener("load", () => {

    const core = new Core(screen_width, screen_height);

    core.preload(image_file);

    core.addEventListener("load", () => {

        const mapRowCount = my_map.length;
        const mapColCount = my_map[0].length;

        // マップを作成
        const map = new Group();

        map.originX  = 0;
        map.originY  = 0;
        map.rowCount = mapRowCount;
        map.colCount = mapColCount;

        // 2次元配列をマップに直す
        for (let row = 0; row < mapRowCount; row++) {
            for (let col = 0; col < mapColCount; col++) {
                const s = new Sprite(tile_size, tile_size);
                s.image = core.assets[image_file];
                s.frame = my_map[row][col];
                s.x     = tile_size * col;
                s.y     = tile_size * row;
                map.addChild(s);
            }
        }

        map.moveField = (x, y, map) => {
            const westEdge  = 0;
            const eastEdge  = (screen_col_count - map.colCount) * tile_size;
            const northEdge = 0;
            const southEdge = (screen_row_count - map.rowCount) * tile_size;
            
            // マップが西に行き過ぎた時、x座標はwestEdgeより大きくなるので、西端まで戻す
            x = Math.min(x, westEdge);

            // マップが東に行き過ぎた時、x座標はeastEdgeより小さくなるので、東端まで戻す
            x = Math.max(x, eastEdge);

            // マップが北に行き過ぎた時、y座標はnorthEdgeより大きくなるので、北端まで戻す
            y = Math.min(y, northEdge);

            // マップが南に行き過ぎた時、y座標はsouthEdgeより小さくなるので、南端まで戻す
            y = Math.max(y, southEdge);

            map.moveTo(x, y);
        };

        // タッチイベント設定
        map.addEventListener(enchant.Event.TOUCH_START, (e) => {
            e.target.originX = e.x - e.target.x;
            e.target.originY = e.y - e.target.y;
        });
        map.addEventListener(enchant.Event.TOUCH_MOVE, (e) => {
            const x = e.x - e.target.originX;
            const y = e.y - e.target.originY;
            e.target.moveField(x, y, e.target);
        });

        // マップをシーンに追加
        core.rootScene.addChild(map);

    }, false);

    core.start();

}, false);