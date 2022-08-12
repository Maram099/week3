window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const result = document.getElementById("result");
    const main = document.getElementsByTagName("main")[0];
    let listening = false;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (typeof SpeechRecognition !== "undefined") {
      const recognition = new SpeechRecognition();
      const stop = () => {
        main.classList.remove("speaking");
        recognition.stop();
        button.textContent = "ابدأ ";
      };

      const start = () => {
        main.classList.add("speaking");
        recognition.start();
        button.textContent = "توقف  ";
        
      };

      const onResult = event => {
        result.innerHTML = "";
        for (const res of event.results) {
          const text = document.createTextNode(res[0].transcript);
          const p = document.createElement("p");
          
         
          
          if (res.isFinal) {
            p.classList.add("final");
          }
          p.appendChild(text);
          result.appendChild(p);
          if(p.textContent.includes('يمين')){
            document.getElementById('replace-me').innerText = "طيب";
          let dirr= 1; 
          document.getElementById('info').innerText= dirr;
        }
          if(p.textContent.includes('يسار')){
            document.getElementById('replace-me').innerText = "طيب";
          let dirr= 2;
          document.getElementById('info').innerText= dirr; }
        }
      };
      recognition.lang= 'ar';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.addEventListener("result", onResult);
      button.addEventListener("click", event => {
        listening ? stop() : start();
        listening = !listening;
      });
    } else {
      button.remove();
      const message = document.getElementById("message");
      message.removeAttribute("hidden");
      message.setAttribute("aria-hidden", "false");
    }
  });

  async function connect() {
      
    // Prompt user to select any serial port.
   const port = await navigator.serial.requestPort();

   // Wait for the serial port to open.
   await port.open({ baudRate: 9600 });

   const textEncoder = new TextEncoderStream();
   const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

   const writer = textEncoder.writable.getWriter();
   
   let msg = document.getElementById('info').innerText;
   await writer.write(msg);

   // Allow the serial port to be closed later.
   writer.releaseLock();
  }