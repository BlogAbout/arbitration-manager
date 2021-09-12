<template>
    <section class="individual-block">
        <div class="wrap">
            <div class="row row-stretch">
                <div class="col col-2">
                    <div class="text-container">
                        <h2>Банкротство физических лиц</h2>
                        <p>Приводит к тому, что в самом начале арестовывается имущество и счета. При помощи эксперта получается иметь ежемесячный прожиточный минимум. Для предприятий такой специалист обеспечивает выделение средств на содержание. Специальные статьи закона «О несостоятельности (банкротстве)» регулируют процесс и деятельность арбитражного управляющего.</p>
                        <p><router-link to="/bankruptcy-individual">Подробнее</router-link></p>
                    </div>
                </div>
                <div class="col col-2">
                    <div class="background-block">
                        <div class="background-block-inner"><strong>Евгения Марченко</strong><br />Арбитражный управляющий</div>
                    </div>
                </div>
            </div>
            <div class="row row-stretch">
                <div
                    v-for="(item, index) in individualList"
                    :key="'individual-item-' + index"
                    class="col col-4"
                >
                    <div class="item">
                        <div class="item-image"><i :class="item.icon"></i></div>
                        <div class="item-content">
                            <h3 class="item-title">{{ item.title }}</h3>
                            <div class="item-description">{{ item.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'IndividualList',
    data: () => ({
        individualList: [
            {
                title: 'Полная и всесторонняя консультация',
                description: 'Перед началом процедуры банкротства с Вами будет проведено расширенное обсуждение всех нюансов.',
                icon: 'fas fa-headset'
            },
            {
                title: 'Гибкая система оплаты',
                description: 'Индивидуальный подход к каждому клиенту. Я даю рассрочку платежа до 8 месяцев.',
                icon: 'fas fa-ruble-sign'
            },
            {
                title: 'Я лично займусь Вашим делом!',
                description: 'Я являюсь Арбитражным управляющим. Моя ответственность застрахована на 10 000 000 рублей.',
                icon: 'fas fa-user-shield'
            },
            {
                title: 'Гарантия результата',
                description: 'Если я взялась за Ваше дело, то Вы сможете спать спокойно. В противном случае, я не только верну Вам деньги, но и выплачу компенсацию морального вреда в 100 000 рублей.',
                icon: 'fas fa-file-invoice-dollar'
            }
        ]
    })
}
</script>