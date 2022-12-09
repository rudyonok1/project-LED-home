import checkNumbInputs from "./checkNumbInputs";


const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumbInputs('input[name="user_phone"]');

    const messeage = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messeage.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () =>{
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = messeage.success;
                })
                .catch (() => statusMessage.textContent = messeage.failure)
                .finally ( () => {
                    clearInputs ();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                })
        });
    });
};

export default forms;