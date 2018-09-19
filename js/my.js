enchant();

const TILE_SIZE        = 102;
const SCREEN_COL_COUNT = 6;
const SCREEN_ROW_COUNT = 7;
const SCREEN_WIDTH     = TILE_SIZE * SCREEN_COL_COUNT;
const SCREEN_HEIGHT    = TILE_SIZE * SCREEN_ROW_COUNT;
const IMAGE_FILE       = "img/tile.png";

const MY_MAP = [
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

    const core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);

    core.preload(IMAGE_FILE);

    core.addEventListener("load", () => {

        const mapRowCount = MY_MAP.length;
        const mapColCount = MY_MAP[0].length;

        // マップを作成
        const map = new Group();

        map.originX  = 0;
        map.originY  = 0;
        map.rowCount = mapRowCount;
        map.colCount = mapColCount;

        // 2次元配列をマップに直す
        for (let row = 0; row < mapRowCount; row++) {
            for (let col = 0; col < mapColCount; col++) {
                const s = new Sprite(TILE_SIZE, TILE_SIZE);
                s.image = core.assets[IMAGE_FILE];
                s.frame = MY_MAP[row][col];
                s.x     = TILE_SIZE * col;
                s.y     = TILE_SIZE * row;
                map.addChild(s);
            }
        }

        map.moveField = (x, y, map) => {
            const northEdge = 0;
            const southEdge = (SCREEN_ROW_COUNT - map.rowCount) * TILE_SIZE;
            const eastEdge  = (SCREEN_COL_COUNT - map.colCount) * TILE_SIZE;
            const westEdge  = 0;

            // マップが西に行き過ぎたら、西端まで戻す
            x = Math.min(x, westEdge);

            // マップが東に行き過ぎたら、東端まで戻す
            x = Math.max(x, eastEdge);

            // マップが北に行き過ぎたら、北端まで戻す
            y = Math.min(y, northEdge);

            // マップが南に行き過ぎたら、南端まで戻す
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