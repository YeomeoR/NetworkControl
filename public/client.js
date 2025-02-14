document.addEventListener('DOMContentLoaded', function() {

    const submitButton = document.getElementById('submitBtn');
    const inputs = ['ipAddress', 'gateway', 'dns1', 'dns2'].map(id => 
        document.getElementById(id)
    );

    submitButton.disabled = document.querySelector('input[value="dynamic"]').checked;
    inputs.forEach(input => {
        input.readOnly = document.querySelector('input[value="dynamic"]').checked;
    });

    const radioButtons = document.querySelectorAll('input[type="radio"][name="ipMode"]');

    function updateRadioColors() {
        radioButtons.forEach(rb => {
            const label = rb.parentElement;
            label.style.color = rb.checked ? '#4CAF50' : '#000000';
        });
    }

    updateRadioColors();

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const currentRadio = event.target;
            const isDynamic = currentRadio.value === 'dynamic';
            
            submitButton.disabled = isDynamic;
            submitButton.style.backgroundColor = isDynamic ? '#cccccc' : '#4CAF50';
            
            updateRadioColors();
            
            inputs.forEach(input => {
                input.readOnly = isDynamic;
                if (isDynamic) {
                    input.value = '';
                }
            });
        });
    });

    document.getElementById('networkForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const isDynamic = document.querySelector('input[value="dynamic"]').checked;
        if (isDynamic) {
            console.log('Form submission blocked - Dynamic mode active');
            return;
        }

        // Get form inputs
        const ipAddress = document.getElementById('ipAddress').value.trim();
        const gateway = document.getElementById('gateway').value.trim();
        const dns1 = document.getElementById('dns1').value.trim();
        const dns2 = document.getElementById('dns2').value.trim();

        const formData = {
            ipAddress,
            gateway,
            dns1,
            dns2
        };
        
        try {
            const response = await fetch('/api/network-config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            
            if (!response.ok) {
                console.log('Server error response:', result);
                throw new Error(result.message);
            }

            console.log('Server success response:', result);
            
            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Network configuration updated successfully!',
                timer: 3000,
                showConfirmButton: false,
                position: 'center',
                background: '#4a4848',
                color: '#ffffff',
                toast: false
            }).then(() => {
                console.log('Form Data:', formData);
            }).catch(error => {
                console.error('Error:', error);
            });

            document.getElementById('networkForm').reset();

        } catch (error) {
            console.log('Caught error:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message || 'Failed to update network configuration',
                timer: 3000,
                showConfirmButton: false,
                position: 'center',
                background: '#4a4848',
                color: '#ffffff',
                toast: false
            });
        }
    });
}); 