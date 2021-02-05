document.querySelector('#audio_file').onchange = function(){
    var fileReader  = new FileReader;
    fileReader.onload = function(){
        var arrayBuffer = this.result;
        snippet.log(arrayBuffer);
        snippet.log(arrayBuffer.byteLength);
    }
    fileReader.readAsArrayBuffer(this.files[0]);

    var url = URL.createObjectURL(this.files[0]);
    console.log(url);

    var tempVideoEl = document.createElement('audio');
    tempVideoEl.setAttribute("controls", "controls")
    tempVideoEl.addEventListener('loadedmetadata', function() {
        // duration is now available here -- store it somewhere as you like
        console.log(tempVideoEl);
    });
    console.log($(tempVideoEl));

    tempVideoEl.src = window.URL.createObjectURL(this.files[0]);
    var canvas = document.getElementById("audio");
    canvas.innerHTML = "";
    canvas.appendChild(tempVideoEl);
    // audio_player.src = url;
    // audio_player.play();
    tempVideoEl.play();
};


document.querySelector('#txt').onchange = function(){
    jDoc.read(this.files[0], {
        success: function (parsedFile) {
            var canvas = document.getElementById("pages-container");
            canvas.innerHTML = "";
            canvas.appendChild(parsedFile.html());
        },

        error: function (error) {
            console.log(error);
        }
    });

}

document.getElementById('excel').addEventListener('change', handleFileSelect, false);

var ExcelToJSON = function() {

    this.parseExcel = function(file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function(sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                console.log(JSON.parse(json_object));
                jQuery( '#xlx_json' ).val( json_object );
            })
        };

        reader.onerror = function(ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

function handleFileSelect(evt) {

    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}
