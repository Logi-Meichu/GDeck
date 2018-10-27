const $body = document.getElementsByTagName("body")[0];
let curPage = 0;

const createPages = () => {
    return [...Array(4).keys()].map((i) => {
        const $div = document.createElement('div');
        $div.className = `page page-${i} ${i === 0 ? 'active' : 'page-next'}`;
        $div.pageid = i;
        $body.appendChild($div);
        
        const $container = document.createElement('div');
        $container.className = 'page-container';
        $div.appendChild($container);
        

        return [$div, $container];
    });
}

const createGrids = ($page) => {
    [...Array(6).keys()].forEach((i) => {
        const $grid = document.createElement('div');
        $grid.className = `grid grid-${i}`;
        
        const $imgWrapper = document.createElement('div');
        $imgWrapper.id = `page-${$page[0].pageid}-grid-${i}`;
        $imgWrapper.className = 'img-wrapper';
        $grid.appendChild($imgWrapper);
        
        const $icon = document.createElement('img');
        $icon.src = `${$page[0].pageid}-${i}.png?v=${Math.random()}`;
        $icon.className = 'ico'
        $imgWrapper.appendChild($icon);
        
        $page[1].appendChild($grid);

        $imgWrapper.style = `height: ${$imgWrapper.clientWidth}px`;
    });
}

const active = (i, $pages) => {
    $pages.forEach(($p) => {
        $p = $p[0];
        if ($p.pageid === i) {
            $p.className = $p.className.replace(/page-next|page-pre/, 'active');
        } else if ($p.pageid < i) {
            $p.className = $p.className.replace(/page-next|active/, 'page-pre');
        } else {
            $p.className = $p.className.replace(/page-pre|active/, 'page-next');
        }
    });
};

const $pages = createPages();
$pages.forEach($p => createGrids($p));

const $scrollup = document.getElementById('scroll-up');
const $scrolldown = document.getElementById('scroll-down');

$scrollup.addEventListener('click', function() {
    if (curPage === 0) {
        return;
    }
    if (curPage-1 === 0) {
        this.className = `${this.className} disabled`;
    } else {
        this.className = this.className.replace('disabled', '');
    }
    active(curPage - 1, $pages);
    $scrolldown.className = $scrolldown.className.replace('disabled', '');
    curPage -= 1;
});

$scrolldown.addEventListener('click', function() {
    if (curPage === 3) {
        return;
    }
    if (curPage+1 === 3) {
        this.className = `${this.className} disabled`;
    } else {
        this.className = this.className.replace('disabled', '');
    }
    active(curPage + 1, $pages);
    $scrollup.className = $scrollup.className.replace('disabled', '');
    curPage += 1;
});

const $screenshotWrapper = document.getElementById('screenshot-wrapper');
const $screenshot = document.getElementById('screenshot');
$screenshot.src = `screenshot.jpg?v=${Math.random()}`;
const $drop = document.getElementsByClassName('sc-drop')[0];

$screenshot.addEventListener('error', function() {
    console.log('error');
    $screenshotWrapper.style = 'display: none';
    $drop.style = 'display: none';
});

$screenshotWrapper.addEventListener('click', function() {
    $drop.className = `${$drop.className} active`;
});

document.getElementById('sc-close').addEventListener('click', function() {
    $screenshotWrapper.style = 'left: -70vw';
    $drop.style = 'left: -20vw';
});