1/key diffrent of these 3 things is selecting.
getElementById- we select by only id and id is alway unique.
getElementsByClassName- we select by class name and it will return all match.
querySelector- its return only first match
querySelectorALl- its return all match and some times in complex situation we use this things.

2/first we need to create element.than we need to add content and attributes and last we need to push it.
example:
let div = document.createElement("div");
div.textContent = "hello from me";
div.classList.add("title");
div.id="card-title";

document.body.appendChild(div);

3/ when an element got event trigger and than event starting to catch parent element and it will go in the end of element.this is the core concept of bubbling.
how does it work: when we click a child it will works like this child=>parent=>grandparent=>document

4/event delegation is a system where we don't need to add different different event listener in child element. we can add a one event lister in parent element.and it will work

5/preventDefault() and stopPropagation() its comes from event object and both have different behaviour.
preventDefault(): it will stop the default behaviour of element.
stopPropagation(): it will stop parent element bubble.