// 宣告變數用於儲存角色站立與行走的精靈圖片
let stopSprite;   // 站立狀態精靈圖 (stop.png，內含10張，寬1395，高196)
let walkSprite;   // 行走狀態精靈圖 (walk.png，內含10張，寬1246，高198)

let charX;        // 角色的 X 座標位置
let speed = 4;    // 角色的移動速度

function preload() {
  // 1. 載入站立精靈圖 (stop.png)
  stopSprite = loadImage('1/stop/stop.png');
  
  // 2. 載入行走精靈圖 (walk.png)
  walkSprite = loadImage('1/walk/walk.png');
}

function setup() {
  // 建立一個視窗全螢幕大小的畫布
  createCanvas(windowWidth, windowHeight);
  // 初始化角色 X 座標位置在視窗寬度的 2/3 處
  charX = width * 2 / 3;
}

function draw() {
  // 設定畫布背景顏色為天空藍色 (R:135, G:206, B:235)
  background(135, 206, 235);

  let direction = 1;      // 設定角色面向方向：1 為向右，-1 為向左
  let isWalking = false;  // 用來判斷目前是否正在移動（行走狀態）

  // 設定走行的尺寸參數（共 10 張，總寬 1246，高 198）
  let walkTotalFrames = 10;
  let walkFrameWidth = 1246 / walkTotalFrames; // 單張寬度 = 124.6
  let walkFrameHeight = 198;

  // 設定站立的尺寸參數（共 10 張，總寬 1395，高 196，根據你提供的 stop 圖片規格）
  let stopTotalFrames = 10;
  let stopFrameWidth = 1395 / stopTotalFrames;  // 單張寬度 = 139.5
  let stopFrameHeight = 196;

  // 判斷鍵盤按鍵狀態與邊界移動限制
  if (keyIsDown(RIGHT_ARROW)) {
    isWalking = true;
    direction = 1; // 設定面向右側
    // 角色向右移動，若到達畫布最右端（保留半個角色寬度）則停止移動
    charX = min(charX + speed, width - walkFrameWidth / 2);

  } else if (keyIsDown(LEFT_ARROW)) {
    isWalking = true;
    direction = -1; // 設定面向左側（進行圖片轉向）
    // 角色向左移動，若到達畫布最左端（保留半個角色寬度）則停止移動
    charX = max(charX - speed, walkFrameWidth / 2);
  }

  // 儲存當前的畫布座標與繪圖狀態
  push();
  
  // 將畫布原點移動到角色的底部定位點 (charX, height)
  translate(charX, height);
  
  // 根據方向進行水平翻轉（若 direction 為 -1 則左右鏡射）
  scale(direction, 1);

  if (isWalking) {
    // --- 行走狀態 (WALK ANIMATION) ---
    // 計算目前播放到第幾張影格（每 6 影格切換一張，循環 10 張）
    let currentFrame = floor(frameCount / 6) % walkTotalFrames;
    let sx = currentFrame * walkFrameWidth;

    // 繪製行走精靈圖影格（置中對齊底部）
    // image(img, 畫布X, 畫布Y, 顯示寬, 顯示高, 來源X, 來源Y, 擷取寬, 擷取高)
    image(walkSprite, -walkFrameWidth / 2, -walkFrameHeight, walkFrameWidth, walkFrameHeight, sx, 0, walkFrameWidth, walkFrameHeight);

  } else {
    // --- 停止狀態 (STOP ANIMATION - 保留原本的精靈圖動畫) ---
    // 計算站立動畫播放到第幾張影格（每 6 影格切換一張，循環 10 張）
    let currentFrame = floor(frameCount / 6) % stopTotalFrames;
    let sx = currentFrame * stopFrameWidth;

    // 繪製站立精靈圖影格（置中對齊底部）
    image(stopSprite, -stopFrameWidth / 2, -stopFrameHeight, stopFrameWidth, stopFrameHeight, sx, 0, stopFrameWidth, stopFrameHeight);
  }

  // 還原畫布座標系狀態，避免影響後續繪製
  pop();
}

function windowResized() {
  // 當瀏覽器視窗大小改變時，自動調整畫布尺寸以維持全螢幕
  resizeCanvas(windowWidth, windowHeight);
}