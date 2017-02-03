function labelPanes() {
  const inners = ["HTML", "JavaScript", "CSS", "Result"];
  const editors = Array.from(document.getElementsByClassName('CodeMirror'))
  editors.push(document.getElementsByClassName('pane')[0]);
  editors.forEach((el, idx) => {
    const childEl = document.createElement('span');
    childEl.setAttribute('class', 'window-label');
    childEl.innerHTML = inners[idx];
    el.appendChild(childEl);
  });
}

function setInitialHeight(containers, codeMirrors, splitVert, panes, iframe) {
  if (window.innerHeight > 560) {
    containers.forEach((el) => {
      el.style.height = (window.innerHeight - 55) + 'px';
    });
    splitVert.style.height = (window.innerHeight - 55) + 'px';
  }

  codeMirrors.forEach((el) => {
    if (window.innerHeight > 560) {
      el.style.height = (((window.innerHeight - 55) / 2) - 1.5) + 'px';
    }
    el.setAttribute('heightDivider', 2);
    el.style.maxHeight = ((window.innerHeight - 55) - 59)+ 'px';
  });

  panes.forEach((el) => {
    if (window.innerHeight > 560) {
      el.style.height = (((window.innerHeight - 55) / 2) - 1.5) + 'px';
    }
    el.setAttribute('heightDivider', 2);
  });

  iframe.contentDocument.body.style.height = (((window.innerHeight - 55) / 2) - 1.5) + 'px';
  iframe.setAttribute('heightDivider', 2);
}

function handleWindowResize(containers, codeMirrors, splitVert, panes, iframe) {
  window.addEventListener('resize', () => {
    const newHeight = window.innerHeight - 55;
    containers.forEach((el) => {
      el.style.height = newHeight + 'px';
    });
    splitVert.style.height = newHeight + 'px';

    codeMirrors.forEach((el) => {
      el.style.height = (newHeight) / el.attributes.heightDivider.value + 'px';
      el.style.maxHeight = (newHeight - 59) + 'px';
    });

    panes.forEach((el) => {
      el.style.height = (newHeight) / el.attributes.heightDivider.value + 'px';
    });
    iframe.style.height = (newHeight) / el.attributes.heightDivider.value + 'px';
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const containers = Array.from(document.getElementsByClassName('container'));
  const codeMirrors = Array.from(document.getElementsByClassName('CodeMirror'));
  const splitVert = document.getElementById('split-vert');
  const panes = Array.from(document.getElementsByClassName('pane'));
  const iframe = document.getElementsByTagName('iframe')[0];

  labelPanes();

  setInitialHeight(containers, codeMirrors, splitVert, panes, iframe);

  handleWindowResize(containers, codeMirrors, splitVert, panes, iframe);
});