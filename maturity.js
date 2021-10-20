// TO DO
// Add the buttons at the bottom of the page
// export and import CSV files
// Subcategory colours
// Subcategory legend
// Add new category (such the plus in the agenda)
// Duplicate a category
// edit categories
//remove the reset button?


//SortableJS setup
const dragArea = document.querySelector('#wrapper')

new Sortable(dragArea, {
    animation: 350,
    handle: ".icon",
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    filter: '.disabled',
    draggable: '.node',
    removeOnSpill: true
})

// if a file is dragged on the body area, it will be removed
const dropArea = document.querySelector('body')
dropArea.addEventListener('dragover', () => {
    dropArea.classList.add('dragover')
})
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover')
})

// Selectors
const mainContainer = document.getElementById('wrapper')
const resetButton = document.getElementById('reset')
const form = document.getElementById('form-container')
const setCategoriesButton = document.getElementById('setCategories')
let categories = document.getElementById('categoriesField')
let subdivisions = document.getElementById('subdivisions')

setCategoriesButton.addEventListener('click', function () {

    //runs if the field is not empty
    if (categories.value !== '' && subdivisions.value !== '') {
        let regex = /[!$%^&*()_+|~=`{}\[\]:";'<>?.\/]\s{2,}\[,]{2,}/gm

        categories = categories.value.replace(regex, ' ')
        categories = categories.split(',')
        categories.forEach(item =>{
            if(item == '') categories.pop(item)
        })
        
        subdivisions = subdivisions.value.replace(regex, ' ')
        subdivisions = subdivisions.split(',')
        subdivisions.forEach(item =>{
            if(item == '') subdivisions.pop(item)
        })

        console.log(subdivisions)

        createAssessment(categories, subdivisions)
        addLegend(subdivisions)

        form.style.display = "none"
        resetButton.style.display = "block"

        //clear the input
        let clearCategoriesField = document.getElementById('categoriesField')
        clearCategoriesField.value = ''
        let clearSubdivisionsField = document.getElementById('subdivisions')
        clearSubdivisionsField.value = ''

        //alerts if the fields are empty or not numbers    
    } else if (categories.value == '') {
        alert("Please, add categories in the field")
        reset()
    } else if (isNaN(subdivisions.value) || subdivisions.value == '') {
        alert('Please, add the subdivisions, i.e. "Current State, Future State"')
        reset()
    }
})

// reset button
resetButton.addEventListener('click', function () {
    reset()
})


// Functions    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function reset() {
    form.style.display = "flex"
    resetButton.style.display = "none"
    mainContainer.innerHTML = ''
    mainContainer.style.display = "none"
}

function createAssessment(categories, subdivisions) {

    mainContainer.style.display = "block"

    if (categories !== '' && subdivisions !== '') {

        //loop through each item in the categories
        categories.forEach(item => {

            //create a node div for each item
            let node = document.createElement('div')
            node.setAttribute('class', 'node')
            mainContainer.appendChild(node)

            //each node needs 2 further divs
            let categoryDiv = document.createElement('div')
            categoryDiv.setAttribute('class', 'category-div')
            node.appendChild(categoryDiv)

            let maturityDiv = document.createElement('div')
            maturityDiv.setAttribute('class', 'maturity-div')
            node.appendChild(maturityDiv)

            // the category div holds the category title, the p element
            let p = document.createElement('p')
            p.setAttribute('class', 'category-title')
            p.innerHTML = `${item}`
            categoryDiv.appendChild(p)

            // handler for sorting
            let iconDiv = document.createElement('div')
            iconDiv.setAttribute('class', 'icon-div')
            node.appendChild(iconDiv)

            let handleIcon = document.createElement('span')
            handleIcon.setAttribute('class', 'icon material-icons')
            handleIcon.innerHTML = 'drag_handle'
            iconDiv.appendChild(handleIcon)


            sliderBuilder(maturityDiv, subdivisions)

        })
    }
}

function sliderBuilder(maturityDiv, subdivisions) {

    subdivisions.forEach(item => {

        //slider container
        let sliderContainer = document.createElement('div')
        sliderContainer.setAttribute('class', 'slider-container')
        maturityDiv.appendChild(sliderContainer)

        // slider score
        let currentScore = document.createElement('span')
        currentScore.setAttribute('class', 'score')
        sliderContainer.appendChild(currentScore)

        // slider
        let currentSlider = document.createElement('input')
        currentSlider.setAttribute('type', 'range')
        currentSlider.setAttribute('min', 0)
        currentSlider.setAttribute('max', 100)
        currentSlider.setAttribute('value', 0)
        currentSlider.setAttribute('class', 'slider')
        sliderContainer.appendChild(currentSlider)

        // slider score interactions
        currentScore.innerHTM = currentSlider.value
        currentSlider.oninput = function () {
            currentScore.innerHTML = this.value
        }
        currentSlider.addEventListener('mousemove', function () {
            let x = currentSlider.value
            let colour = `linear-gradient(90deg, var(--colour01) ${x}%, var(--grey) ${x}%)`
            currentSlider.style.background = colour
        })
    })
}

function addLegend(subdivisions){
    console.log(subdivisions)
}