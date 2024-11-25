
        // Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyAvwvpmUQQZP7dqBknjFQUvjGjKl7CBI-4",
            authDomain: "datn-9937a.firebaseapp.com",
            databaseURL: "https://datn-9937a-default-rtdb.firebaseio.com",
            projectId: "datn-9937a",
            storageBucket: "datn-9937a.appspot.com",
            messagingSenderId: "1064950197769",
            appId: "1:1064950197769:web:0aa93c9c6917b9a290d2d8",
            measurementId: "G-NLTQMENSC7"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();


        var nhietdo1 = document.getElementById('nhietdo') ; //khai báo biến nhiệt độ. var là kiểu dữ liệu var=int+float+char ...
        var dbRef = firebase.database().ref().child('slave1/temperature'); //đọc giá trị nhietDo từ firebase
        
        var doam1 = document.getElementById('doam');
        var dbRef2 = firebase.database().ref().child('slave1/humidity');   //đọc giá trị doAm từ firebase
        
        var gas3 = document.getElementById('gas');
        var dbRef3 = firebase.database().ref().child('slave1/mq7Value');   //đọc giá trị luongMua từ firebase
        

        var uv4 = document.getElementById('uv') ; //khai báo biến nhiệt độ. var là kiểu dữ liệu var=int+float+char ...
        var dbRef4 = firebase.database().ref().child('slave1/UV_index'); //đọc giá trị nhietDo từ firebase
        
        var dust5 = document.getElementById('dust');
        var dbRef5 = firebase.database().ref().child('slave2/dustDensity');   //đọc giá trị doAm từ firebase
        
        var sound6 = document.getElementById('sound');
        var dbRef1 = firebase.database().ref().child('slave2/soundValue');

        var rain7 = document.getElementById('rain');
        var dbRef6 = firebase.database().ref().child('slave2/rainValue'); 

        var wind8 = document.getElementById('wind');
        var dbRef7 = firebase.database().ref().child('slave2/speedValue'); 

        var nhietdo2 = document.getElementById('nhietdob');
        var dbRef8 = firebase.database().ref().child('slave2/temperature'); 

        var doam2 = document.getElementById('doamb');
        var dbRef9 = firebase.database().ref().child('slave2/humidity'); 

        dbRef.on('value', snap => nhietdo1.innerText = snap.val() + "*C");
        dbRef2.on('value', snap => doam1.innerText = snap.val() + "%");
        dbRef3.on('value', snap => gas3.innerText = snap.val() + "ppm");
        dbRef4.on('value', snap => uv4.innerText = snap.val() + "");
        dbRef5.on('value', snap => dust5.innerText = snap.val() + "ug/m3");
        dbRef1.on('value', snap => sound6.innerText = snap.val() + "dB");
        dbRef6.on('value', snap => rain7.innerText = snap.val() + "%");
        dbRef7.on('value', snap => wind8.innerText = snap.val() + "km/h");
        dbRef8.on('value', snap => nhietdo2.innerText = snap.val() + "*C");
        dbRef9.on('value', snap => doam2.innerText = snap.val() + "%");
        
        
// Lưu giá trị thanh trượt
function saveSliderValue(sliderId, value) {
    localStorage.setItem(sliderId, value);
}

// Tải giá trị từ localStorage khi trang tải lại
function loadSliderValue(sliderId, displayElementId) {
    const savedValue = localStorage.getItem(sliderId);
    const slider = document.getElementById(sliderId);
    const displayElement = document.getElementById(displayElementId);

    if (savedValue !== null) {
        slider.value = savedValue;
        displayElement.textContent = savedValue;
    }

    // Cập nhật giá trị hiển thị khi thay đổi
    slider.oninput = function () {
        displayElement.textContent = this.value;
        saveSliderValue(sliderId, this.value);
    };
}

// Gọi hàm load cho từng thanh trượt
loadSliderValue("windSlider", "windValue");
loadSliderValue("rainSlider", "rainValue");

// Các phần tử DOM liên quan
const windValueElement = document.getElementById("wind");
const windSlider = document.getElementById("windSlider");
const rainValueElement = document.getElementById("rain");
const rainSlider = document.getElementById("rainSlider");

const slaveBoxwind = document.getElementById("wind-box");
const slaveBoxrain = document.getElementById("rain-box");

const toggleButton = document.getElementById("toggle-button");

// Kiểm tra giá trị và cập nhật trạng thái
function checkValues() {
    const windValue = parseInt(windValueElement.textContent);
    const sliderWindValue = parseInt(windSlider.value);

    const rainValue = parseInt(rainValueElement.textContent);
    const sliderRainValue = parseInt(rainSlider.value);

    // Chỉ kiểm tra nếu nút ON
    if (toggleButton.classList.contains("toggle-on")) {
        // Kiểm tra giá trị bão
        if (windValue > sliderWindValue) {
            slaveBoxwind.classList.add("highlight"); // Thêm lớp nhấp nháy
        } else {
            slaveBoxwind.classList.remove("highlight"); // Xóa lớp nhấp nháy
        }

        // Kiểm tra giá trị mưa
        if (rainValue > sliderRainValue) {
            slaveBoxrain.classList.add("highlight"); // Thêm lớp nhấp nháy
        } else {
            slaveBoxrain.classList.remove("highlight"); // Xóa lớp nhấp nháy
        }
    } else {
        // Tắt nhấp nháy khi nút OFF
        slaveBoxwind.classList.remove("highlight");
        slaveBoxrain.classList.remove("highlight");
    }
}

// Sự kiện thay đổi giá trị thanh trượt
windSlider.addEventListener("input", checkValues);
rainSlider.addEventListener("input", checkValues);

// Sự kiện nhấn nút On/Off
toggleButton.addEventListener("click", () => {
    if (toggleButton.classList.contains("toggle-off")) {
        // Chuyển sang trạng thái ON
        toggleButton.classList.remove("toggle-off");
        toggleButton.classList.add("toggle-on");
        toggleButton.textContent = "ON";

        console.log("Thiết bị được bật!");

        // Kiểm tra lại ngay khi bật
        checkValues();
    } else {
        // Chuyển sang trạng thái OFF
        toggleButton.classList.remove("toggle-on");
        toggleButton.classList.add("toggle-off");
        toggleButton.textContent = "OFF";

        console.log("Thiết bị đã tắt!");

        // Tắt nhấp nháy ngay lập tức
        checkValues();
    }
});

// Hiển thị đồng hồ thời gian thực
function dongho() {
    const time = new Date();
    const gio = time.getHours().toString().padStart(2, "0");
    const phut = time.getMinutes().toString().padStart(2, "0");
    const giay = time.getSeconds().toString().padStart(2, "0");

    document.getElementById("time").textContent = `${gio}:${phut}:${giay}`;
    setTimeout(dongho, 1000);
}
dongho();
