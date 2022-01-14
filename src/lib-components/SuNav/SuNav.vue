<template>
    <div class="su-nav">
        <div class="su-nav-inner-w">
            <div class="su-nav__fixed">
                <div class="su-nav__scroll">
                    <div class="su-nav__scroll-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'su-nav'
}
</script>