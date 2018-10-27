const $body = document.getElementsByTagName("body")[0];
let curPage = 0;

const createPages = () => {
    return [...Array(4).keys()].map((i) => {
        const $div = document.createElement('div');
        $div.className = `page page-${i} ${i === 0 ? 'active' : 'page-next'}`;
        $div.pageid = i;
        $body.appendChild($div);
        return $div;
    });
}

const createGrids = ($page) => {
    [...Array(8).keys()].forEach((i) => {
        const $grid = document.createElement('div');
        $grid.className = `grid grid-${i}`;
        
        const $imgWrapper = document.createElement('div');
        $imgWrapper.className = 'img-wrapper';
        $grid.appendChild($imgWrapper);
        
        const $icon = document.createElement('img');
        $icon.src = `${$page.pageid}-${i}.png`;
        $imgWrapper.appendChild($icon);
        
        $page.appendChild($grid);

        $imgWrapper.style = `height: ${$imgWrapper.clientWidth}px`;
    });
}

const active = (i, $pages) => {
    $pages.forEach(($p) => {
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
