console.log("Welcome");

let requirements = {
  video: {
    facingMode: "user",
    width: 300,
    height: 200,
  },
  audio: false,
};

navigator.mediaDevices
  .getUserMedia(requirements)
  .then(function (stream) {
    let videoOne = document.getElementById("video1");

    videoOne.srcObject = stream;
    let record = new MediaRecorder(stream);

    let chunks = [];
    // console.log(record);

    document
      .getElementById("start_video")
      .addEventListener("click", function () {
        record.start();
        console.log("Starting");
      });

    document
      .getElementById("pause_video")
      .addEventListener("click", function () {
        record.pause();
        console.log("Pause.......");
      });

    document
      .getElementById("resume_video")
      .addEventListener("click", function () {
        record.resume();
        console.log("resume.....");
      });

    document
      .getElementById("stop_video")
      .addEventListener("click", function () {
        record.stop();
        console.log("Stop.......");
      });

    record.ondataavailable = function (e) {
      chunks.push(e.data);
      console.log(e);
    };

    record.onstop = function () {
      let videoTwo = document.getElementById("video2");
      let newStream = new Blob(chunks, { type: "video / mp4" });
      console.log(newStream);
      chunks = [];

      videoTwo.src = URL.createObjectURL(newStream);
    };


    //take a selfie
    
    document
      .getElementById("take_picture")
      .addEventListener("click", function () {
        let canvas = document.createElement("canvas");

        let context2D = canvas.getContext("2d");

        context2D.drawImage(videoOne, 0, 0, 200, 195);

        let parentDiv = document.getElementById("parentDiv");

        parentDiv.appendChild(canvas);

        let image = canvas.toDataURL();

        let a = document.createElement("a");

        a.href = image;
        a.download = "image.png";
        a.click();
      });
  })
  .catch((err) => {
    console.log(err);
  });
