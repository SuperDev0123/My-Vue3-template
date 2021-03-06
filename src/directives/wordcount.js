import utils from 'heyui/utils/utils';
import locale from 'heyui/locale';

const wordcount = function (total, el, remainDom) {
  let v = el.value.length;
  let remain = total - v;
  if (remain >= 0) {
    remainDom.innerText = v;
    utils.removeClass(remainDom, 'red-color');
  } else {
    remainDom.innerText = locale.hlang('h.wordcount.warn', [Math.abs(remain)]);
    utils.addClass(remainDom, 'red-color');
  }
};

export default {
  mounted(el, binding) {
    if (utils.isNumber(binding.value)) {
      let total = binding.value;
      let wordElement = document.createElement('p');
      wordElement.innerHTML = `<span><span class='h-wordcount-remain-size'></span> / <span class='h-wordcount-total-size'>${total}</span></span>`;
      utils.addClass(wordElement, 'h-wordcount');
      let parent = el.parentNode;
      parent.insertBefore(wordElement, el);
      let remainDom = parent.querySelector('.h-wordcount-remain-size');
      el.remainDom = remainDom;
      wordcount(total, el, remainDom);
      el.addEventListener('input', () => {
        wordcount(total, el, remainDom);
      });
      // for (let d of vnode.data.directives) {
      //   if (d.name == 'model') {
      //     vnode.context.$watch(d.expression, function() {
      //       wordcount(total, el, remainDom);
      //     });
      //     break;
      //   }
      // }
    }
  },
  beforeUnmount(el) {
    let previousnode = el.previousSibling;
    if (previousnode && utils.hasClass(previousnode, 'h-wordcount')) {
      previousnode.parentNode.removeChild(previousnode);
    }
  }
};
