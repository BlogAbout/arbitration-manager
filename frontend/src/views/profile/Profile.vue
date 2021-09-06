<template>
    <main class="main-container">
        <section class="content-block">
            <div class="wrap">
                <div class="content-block-inner">
                    <h1>Личный кабинет</h1>
                    <h3>Личные данные</h3>
                    <div class="user-information">
                        <p><span>Тип:</span> Юридическое лицо</p>
                        <p><span>Компания:</span> Blog About Company</p>
                        <p><span>Фамилия:</span> Адамовичус</p>
                        <p><span>Имя:</span> Павел</p>
                        <p><span>Отчество:</span> Владимирович</p>
                        <p><span>Логин:</span> admin</p>
                        <p><span>Телефон:</span> 8 (999) 999-99-99</p>
                        <p><span>E-mail:</span> info@blog-about.ru</p>
                    </div>
                    <h3>Документы</h3>
                    <div class="user-information">
                        <p><span>Паспортные данные</span> <a href="#" class="green">Загружено</a></p>
                        <p><span>ИНН</span> <a href="#" class="green">Загружено</a></p>
                        <p><span>Реквизиты компании</span> <a href="#" class="red">Загрузить</a></p>
                        <p><span>Другое</span> <a href="#" class="red">Загрузить</a></p>
                    </div>
                    <h3>Состояние</h3>
                    <div class="user-information">
                        <p><span>Статус:</span> проверка документов</p>
                        <p><span>Дополнительно:</span> сотрудник проверяет корректность документов</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    name: 'Profile'
}
</script>