document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('originalPreview').src = e.target.result;
            document.getElementById('previewSection').style.display = 'block';
            removeBackground(file);
        };
        reader.readAsDataURL(file);
    }
}

async function removeBackground(file) {
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'bQHVrYurXj8y21DJJq7pDD1x'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to remove background');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        document.getElementById('resultPreview').src = url;


        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.style.display = 'block';
        downloadBtn.href = url;
        downloadBtn.download = 'removed-background.png';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to remove background. Please try again.');
    }
}