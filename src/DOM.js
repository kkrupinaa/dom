import { createElement } from 'react';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const elem = (document.createElement(tag).innerHTML =
            '<p>' + content + '</p>');
        document.body.insertAdjacentHTML('beforeend', elem);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function buildTree(n) {
        const div = document.createElement('div');
        div.className = 'item_' + n;
        if (n < level) {
            for (let i = 0; i < childrenCount; i++) {
                const newdiv = buildTree(n + 1);
                div.appendChild(newdiv);
            }
        }
        return div;
    }
    let root = buildTree(1);
    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let root = generateTree(2, 3);
    function replace(root) {
        let name = '';
        if (root.className == 'item_2') {
            name = 'section';
        } else name = 'div';
        const div = document.createElement(name);
        div.className = root.className;
        [].slice.call(root.children).forEach((child) => {
            div.appendChild(replace(child));
        });
        return div;
    }
    let root2 = replace(root);
    return root2;
}
