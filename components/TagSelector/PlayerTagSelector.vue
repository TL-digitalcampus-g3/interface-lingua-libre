<template>
  <div class="selector">
    <button>
      <Badge
        class="active-tag"
        bg-color="var(--color-primary)"
        border-color="var(--color-primary)"
        text-color="white"
      >
        {{ $t('TAGS.' + activeTag.toUpperCase()) }}
      </Badge>
    </button>
    <div class="dropdown-wrapper">
      <div class="dropdown">
        <button
          v-for="tag in tags"
          :key="tag"
          class="mb-2 mr-2"
          @click="setTag(tag)"
        >
          <Badge
            border-color="var(--color-primary)"
            :text-color="activeTag === tag ? 'white' : 'var(--color-primary)'"
            :bg-color="
              activeTag === tag ? 'var(--color-primary)' : 'transparent'
            "
          >
            {{ $t('TAGS.' + tag.toUpperCase()) }}
          </Badge>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Badge from '~/components/ui/Badge.vue'
import { Tag, RecordT } from '~/models/Record'
import { TagMutationPayload } from '~/store'

@Component({ components: { Badge } })
export default class className extends Vue {
  @Prop({ required: true }) readonly activeTag!: Tag
  @Prop({ required: true }) readonly fileName!: RecordT['fileName']

  readonly tags: Tag[] = Object.values(Tag)

  setTag(tag: Tag): void {
    const payload: TagMutationPayload = { fileName: this.fileName, tag }
    this.$store.dispatch('setTag', payload)
  }
}
</script>

<style lang="scss" scoped>
.selector {
  .dropdown-wrapper {
    position: relative;
    display: none;
  }
  .dropdown {
    position: absolute;
    background: white;
    right: 0;
    text-align: right;
    @apply bg-backgroundBlock-light dark:bg-backgroundBlock-dark p-4 shadow rounded-lg max-w-xs w-max;
  }

  &:hover {
    .dropdown-wrapper {
      display: block;
    }
  }
}
</style>