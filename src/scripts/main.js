window.addEventListener('DOMContentLoaded', ()=> {
    console.log('App init');

    const card = document.querySelector('.card');
    const noClickElements = card.querySelectorAll('.no-click');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close');
    const modalButton = document.querySelector('.modal__button');

    modal.open = () => modal.classList.add('modal--visible');
    modal.close = () => modal.classList.remove('modal--visible');
    
    card.addEventListener('click', (e) => {
        if (![...noClickElements].includes(e.target))
            modal.open()
    });

    modalClose.addEventListener('click', () => modal.close());
    modalButton.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Escape') modal.close();
    });
})