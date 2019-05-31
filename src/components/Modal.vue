<template lang="html">
  <portal :to="portal">
    <transition name="u-trans-pop-in" @after-enter="handleEnter">
      <div class="o-modal" @click.self="closeModal" tabindex="-1" role="dialog">
        <div :class="classNames" role="document">
          <div class="o-modal__container">
            <button v-if="hasClose" class="o-modal__close" @click="closeModal" tabindex="0">
              <Icon type="close" />
              <span class="u-visually-hidden">Close modal</span>
            </button>
            <div class="u-p-xl u-bg-white">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import ally from 'ally.js';
import Icon from '@/components/Icon';

export default {
  props: {
    modifiers: {
      type: Array,
      required: false,
    },
    hasClose: {
      type: Boolean,
      default: true,
    },
    portal: {
      type: String,
      default: 'modal',
    },
  },
  components: {
    Icon,
  },
  data() {
    return {
      focus: {
        first: null,
        last: null,
      },
    };
  },
  computed: {
    classNames() {
      if (this.modifiers && this.modifiers.length > 0) {
        return ['o-modal__dialog'].concat(this.modifiers);
      }
      return ['o-modal__dialog'];
    },
  },
  methods: {
    closeModal() {
      if (this.hasClose) {
        this.$emit('emitClose');
      }
    },
    handleKeyboard(event) {
      // Close on escape if user can close
      if (this.hasClose) {
        if (event.key === 'Escape' || event.keyCode === 27) {
          this.closeModal();
        }
      }
      // Keep tabbing trapped in the modal
      if (event.key === 'Tab' || event.keyCode === 9) {
        if (event.shiftKey) {
          if (document.activeElement.hasAttribute('data-focus-first')) {
            // We are attempting to tab out the top
            event.preventDefault();
            this.focus.last.focus();
          }
        } else if (document.activeElement.hasAttribute('data-focus-last')) {
          event.preventDefault();
          this.focus.first.focus();
        }
      }
    },
    handleEnter() {
      // Set the focus trap
      const focusable = ally.query.focusable({
        context: '.o-modal__container',
        includeContext: true,
        strategy: 'quick',
      });

      this.focus.first = focusable[0];
      this.focus.first.setAttribute('data-focus-first', 1);
      this.focus.last = focusable[focusable.length - 1];
      this.focus.last.setAttribute('data-focus-last', 1);

      this.focus.first.focus();

      window.addEventListener('keydown', this.handleKeyboard);
    },
  },
  created() {
    // Remove non-modal content from readability
    const globalContainer = document.getElementById('site-main');
    document.body.classList.add('no-scroll');
    globalContainer.setAttribute('tabindex', -1);
    globalContainer.setAttribute('aria-hidden', true);
  },
  beforeDestroy() {
    // Return non-modal content to readability
    const globalContainer = document.getElementById('site-main');
    document.body.classList.remove('no-scroll');
    globalContainer.removeAttribute('tabindex');
    globalContainer.removeAttribute('aria-hidden');
    window.removeEventListener('keydown', this.handleKeyboard);
  },
};
</script>
