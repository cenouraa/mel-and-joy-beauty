(function(){
    const form = document.getElementById('reservationForm'); //pega o formulário
    const successBox = document.getElementById('reservationSuccess'); //pega a caixa de sucesso verde
    const feedbackBox = document.getElementById('feedbackMessage'); //pega a caixa de feedback
    const feedbackBtn = document.querySelector('#feedbackMessage button'); //pega o botão de feedback
    const fields = form.querySelectorAll('[required]'); //pega todos os campos obrigatórios
    const chkAccept = document.getElementById('chkAccept'); //pega o checkbox de aceitar
    const submitBtn = form.querySelector('.bookForm_submit'); //pega o botão de submit

    if(!form) return; //se o formulario nao existe

    //habilita e desabilita botao
    submitBtn.disabled = true;
    chkAccept.addEventListener('change', () => {
        submitBtn.disabled = !chkAccept.checked;
    });

    //validacao dos campos
    form.addEventListener('submit', (e) => {
        e.preventDefault(); //previne o envio do formulário

        //percorre todos os required
        for (const field of fields){
            if (!field.checkValidity()){
                showError(`Please fill in the field: ${field.previousElementSibling?.textContent||field.name}`);
                field.focus();
                return;
            }
        }

        // valida horário (09‑18h) e data futura
        const time = document.getElementById('bf-time').value;
        const [h,m] = time.split(':').map(Number);
            if (h<9 || h>18 || (h===18 && m>0)){
                showError('Choose a time between 09:00 and 18:00.');
                return;
            }
        const date = document.getElementById('bf-date').value;
            if (new Date(date) < new Date().setHours(0,0,0,0)){
                showError('Date must be today or later.');
                return;
            }

        //se tudo passar, envia o formulário
        form.style.display = 'none';
        successBox.style.display = 'block'; //mostra a caixa de sucesso
        form.reset();
        submitBtn.disabled = true;
    });

    //exibe mensagens de erro
    function showError(msg) {
        const feedbackBox = document.getElementById('feedbackMessage');
        feedbackBox.querySelector('p').textContent = msg;
        feedbackBox.classList.add('show');
        feedbackBtn.focus();
    }
    function hideError(){
        feedbackBox.classList.remove('show');
    }
    feedbackBtn.addEventListener('click', hideError);
    window.addEventListener('keyup', (e)=>{ 
        if(e.key==='Escape') hideError(); 
    });
})();
