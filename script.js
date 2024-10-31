            // lưu giá trị thanh trượt
            // Hàm để lưu giá trị vào localStorage
            function saveSliderValue(sliderId, value) {
                localStorage.setItem(sliderId, value);
            }
        
            // Hàm để tải giá trị từ localStorage khi trang tải lại
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

            ///////////////////////////////////////////////////////////////
            // thiên tai
            //////////////////////////////////////////////////////////////
            const windValueElement = document.getElementById('wind');
            const windSlider = document.getElementById('windSlider');
            const rainValueElement = document.getElementById('rain');
            const rainSlider = document.getElementById('rainSlider');
        
            const slaveBox = document.getElementById('slave3-box'); // Lấy khung "Thiên tai"
        
            function checkValues() {
                const windValue = parseInt(windValueElement.textContent);
                const sliderWindValue = parseInt(windSlider.value);
        
                const rainValue = parseInt(rainValueElement.textContent);
                const sliderRainValue = parseInt(rainSlider.value);
        
                // Kiểm tra giá trị gió
                if (windValue > sliderWindValue || rainValue > sliderRainValue) {
                    slaveBox.classList.add('highlight'); // Thêm lớp nhấp nháy
                } else {
                    slaveBox.classList.remove('highlight'); // Xóa lớp nhấp nháy
                }
            }
        
            windSlider.addEventListener('input', checkValues);
            rainSlider.addEventListener('input', checkValues);
            ///////////////////////////////////////////////////////////////
            // TIME 
            //////////////////////////////////////////////////////////////
                   function dongho() {
                    var time = new Date();
                    var gio = time.getHours();
                    var phut = time.getMinutes();
                    var giay = time.getSeconds();
                    if (gio < 10) 
                    gio = "0" + gio;
                    if (phut < 10) 
                    phut = "0" + phut;
                    if (giay < 10) 
                    giay = "0" + giay;
                    document.getElementById("time").innerHTML = gio + ":" + phut + ":" + giay;
                    setTimeout("dongho()", 1000);
                    };
                    dongho();
            ///////////////////////////////////////////////////////////////
            // Fisebase
            //////////////////////////////////////////////////////////////
            