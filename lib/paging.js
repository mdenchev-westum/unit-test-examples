'use strict'

function pagingSection(start, end, current) {
	let pagesArr = [];
	if(end === 0) {
		return [];
	}
	for (let i = start; i <= end; i++) {

		pagesArr.push({
			label: i,
			href: i === current ? null : 'http://www.example.com/page/' + i,
		});
	}

	return pagesArr;
}

function paging(items = 100, ipp = 10, current = 1, cache) {
	let pages = Math.ceil(items / ipp);
	let pagesArr = [];

	// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

	// [1], 2, 3, .... 10
	// 1, [2], 3, .... 10
	// 1, 2, [3], 4 ... 10
	// 1 ... 4, [5], 6 ... 10
	// 1 .... 3, [4], 5 ... 10
	// 1 .... 5, [6], 7 .... 10
	// 1, .... 8, [9], 10
	// 1, ...., 8, 9, [10]

	let start = [0,0], middle = [0,0], end = [0,0];

	if (pages <= 4) {
		start = [1, 5];
	} else if (current <= 3) {
		start = [1, 4];
		if (pages > 6) {
			end = [pages - 1, pages];
		} else {
			end = [pages, pages];
		}
	} else if (current >= 3 && current < pages - 3) {
		start = [1,1];
		middle = [current - 1, current + 1];
		end = [pages - 1, pages];
	} else if (current >= pages - 3) {
		start = [1,1];
		end = [pages - 3, pages];
	}

	pagesArr = pagesArr.concat(pagingSection(start[0], start[1], current));
	pagesArr = pagesArr.concat(pagingSection(middle[0], middle[1], current));
	pagesArr = pagesArr.concat(pagingSection(end[0], end[1], current));
	
	if(pagesArr.length > 1) {
		cache.put('paging', pagesArr);
	}

	return pagesArr;
}

module.exports = paging;