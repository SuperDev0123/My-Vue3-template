import utils from 'heyui/utils/utils';
import locale from 'heyui/locale';
import Message from 'heyui/plugins/message';

const wordlimit = function (el, total) {
  let v = el.value.length;
  if (v > total) {
    el.value = el.value.substring(0, total);
    if (el.getAttribute('data-alerted') == '0') {
      Message.error(locale.hlang('h.wordlimit.warn', [total]));
    }
    el.dispatchEvent(new Event('input'));
    el.setAttribute('data-alerted', '1');
  }
};

export default {
  mounted(el, binding, vnode) {
    if (utils.isNumber(binding.value)) {
      let total = binding.value;
      el.setAttribute('data-alerted', '0');
      wordlimit(el, total);
      el.addEventListener('input', () => {
        wordlimit(el, total, vnode);
      });
      el.addEventListener('blur', () => {
        el.setAttribute('data-alerted', '0');
      });
      // for (let d of vnode.data.directives) {
      //   if (d.name == 'model') {
      //     vnode.context.$watch(d.expression, function() {
      //       wordlimit(el, total);
      //     });
      //     break;
      //   }
      // }
    }
  }
};
