<template>
    <div class="su-main">
        <div class="su-main__layout">
            <div class="su-main__layout-center">
                <slot></slot>
            </div>

            <div class="su-main__layout-right">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'su-main'
}
</script>