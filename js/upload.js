document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('dropArea');
    const fileUpload = document.getElementById('fileUpload');
    const fileInfo = document.getElementById('fileInfo');
    const submitBtn = document.getElementById('submitBtn');
    const uploadForm = document.getElementById('uploadForm');
    
    let selectedFile = null;
    
    // Abrir el selector de archivos al hacer clic en el área
    dropArea.addEventListener('click', function() {
        fileUpload.click();
    });
    
    // Manejar la selección de archivos
    fileUpload.addEventListener('change', function(e) {
        handleFiles(e.target.files);
    });
    
    // Prevenir comportamiento por defecto para eventos de arrastre
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Añadir clase visual durante el arrastre
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, function() {
            dropArea.classList.add('dragging');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, function() {
            dropArea.classList.remove('dragging');
        }, false);
    });
    
    // Manejar archivos soltados
    dropArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }, false);
    
    // Procesar los archivos
    function handleFiles(files) {
        if (files.length > 0) {
            selectedFile = files[0];
            displayFileInfo(selectedFile);
            submitBtn.disabled = false;
        }
    }
    
    // Mostrar información del archivo
    function displayFileInfo(file) {
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        fileInfo.textContent = `${file.name} (${fileSize} MB)`;
    }
    
    // Manejar el envío del formulario
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedFile) {
            alert('Por favor, selecciona un archivo primero.');
            return;
        }
        
        const nombre = document.getElementById('nombre').value;
        
        // Aquí puedes implementar la lógica para enviar el archivo y el nombre
        // Por ejemplo, usando FormData y fetch:
        
        const formData = new FormData();
        formData.append('archivo', selectedFile);
        formData.append('nombre', nombre);
        
        // Simulación de envío (reemplazar con tu endpoint real)
        console.log('Enviando archivo:', selectedFile);
        console.log('Nombre:', nombre);
        
        // Ejemplo de cómo enviar los datos al servidor:
        /*
        fetch('/tu-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            alert('Archivo enviado con éxito!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al enviar el archivo.');
        });
        */
        
        // Para esta demostración, simplemente mostramos un mensaje de éxito
        alert('Formulario enviado con éxito!');
        
        // Resetear el formulario
        uploadForm.reset();
        fileInfo.textContent = '';
        selectedFile = null;
        submitBtn.disabled = true;
    });
});