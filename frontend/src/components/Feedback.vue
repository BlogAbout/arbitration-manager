<template>
    <section class="feedback-block">
        <div class="map">
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A261cb66fa5dcab16bc9b71f3e994f597bbe9d5585f0cabc7eb92d963e438daad&amp;source=constructor"
                width="100%"
                height="500"
                frameborder="0"
            ></iframe>
        </div>
        <div class="wrap">
            <div class="feedback-container">
                <div class="contacts">
                    <p>Телефон: <a href="tel:+79881554020">+7 (988) 155-40-20</a></p>
                    <p>E-mail: <a href="mailto:info@arbitration-manager.ru">info@arbitration-manager.ru</a></p>
                    <p>Адрес офиса: Краснодарский край, г. Сочи, Адлерский район, ул. Свердлова, д. 55, офис 15</p>
                </div>
                <feedback-form />
            </div>
        </div>
    </section>
</template>

<script>
import FeedbackForm from "@/components/FeedbackForm"

export default {
    name: 'Feedback',
    components: {
        FeedbackForm
    }
}
</script>