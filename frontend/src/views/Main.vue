<template>
    <main class="main-container">
        <section class="slogan-block">
            <div class="wrap">
                <div class="row">
                    <div class="col col-2">
                        <div class="slogan-image">
                            <img src="../assets/images/about.jpg" alt="Евгения Марченко" />
                        </div>
                    </div>
                    <div class="col col-2">
                        <div class="slogan-text">
                            <h2 class="main-head">Евгения Марченко</h2>
                            <h2>Банкротство физических и юридических лиц</h2>
                            <h3>Полное сопровождение процедуры</h3>
                            <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <diplomas-list />
        <individual-list />
        <section class="information-block">
            <div class="wrap">
                <div class="information-block-inner">
                    <h2 class="text-center">Арбитражный управляющий</h2>
                    <p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
        </section>
        <entity-list />
        <feedback />
    </main>
</template>

<script>
    import DiplomasList from "@/components/DiplomasList"
    import IndividualList from "@/components/IndividualList"
    import EntityList from "@/components/EntityList"
    import Feedback from "@/components/Feedback"

    export default {
        name: 'Main',
        components: {
            DiplomasList,
            IndividualList,
            EntityList,
            Feedback
        },
        data: () => ({

        })
    }
</script>