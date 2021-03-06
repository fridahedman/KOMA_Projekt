import React from 'react'
import './../index.css'
import { Link, useParams} from 'react-router-dom';
import recipes from '../API/API_drinks'
import Drink from '../Drink'

const Result = () => {

  //Converts API to an array
  const drinks = recipes.recipes

  //Takes the selected filters from url
  let {FSelected} = useParams()
  console.log(FSelected)

  //Converts the string into arrays
  const SelectedCategory = FSelected.split('*')
  const basfilter = SelectedCategory[0].split(',')
  const ingfilter = SelectedCategory[1].split(',')
  const farfilter = SelectedCategory[2].split(',')
  const smafilter = SelectedCategory[3].split(',')

  //See if search matches a drink
  function match(word, s) {
    //console.log(word)
    const lowerCaseWord = word.toLowerCase();
    const lowerCaseSearchString = s.toLowerCase();

    return lowerCaseWord.indexOf(lowerCaseSearchString) === 0;
  }

  //Filter bassprit
  function basfiltering(s){
    const test = spi => {
      //console.log(spi)
      const size = spi.length
      //console.log(size)
      let i = 0
      while(i < size){
        if(match(spi[i], s) === true){
          //console.log("finns")
          return true
        }
        i++;
      }
      return false
    }
    //Filter 
    //let filteredWords = drinks.filter(d => (d.ingridients.map(p => (match(p.ingridient_name)))))
    let filteredWords = drinks.filter(d => (test(d.spirits) === true))
    //console.log(filteredWords)
    return filteredWords;
  }
  
  //Filter ingredienser
  function ingfiltering(s){
    const test = ing => {
      const size = ing.length
      let i = 0
      while(i < size){
        if(match(ing[i].ingridient_name, s) === true){
          //console.log("finns")
          return true
        }
        i++;
      }
      return false
    }
    //Filter 
    //let filteredWords = drinks.filter(d => (d.ingridients.map(p => (match(p.ingridient_name)))))
    let filteredWords = drinks.filter(d => (test(d.ingridients) === true))
    //console.log(filteredWords)
    return filteredWords;
  }

  //Filter färger
  function farfiltering(s){
    let filteredWords = drinks.filter(d => (match(d.color, s)))
    //console.log(filteredWords)
    return filteredWords;
  }

  //Filter smak
  function smafiltering(s){
    let filteredWords = drinks.filter(d => (match(d.taste, s)))
    //console.log(filteredWords)
    return filteredWords;
  }
  
  //valda string
  var filter = [];

  //Sök genom bassprit array
  let i = 0
  let allFilteredDrinks =[]
  if(basfilter[0] !== ""){
    while(i < basfilter.length){
      allFilteredDrinks.push(basfiltering(basfilter[i]))
      filter.push(basfilter[i]);
      i++
    }
  }

  //Sök genom ingrediens array
  i = 0
  if(ingfilter[0] !== ""){
    while(i < ingfilter.length){
      allFilteredDrinks.push(ingfiltering(ingfilter[i]))
      filter.push(ingfilter[i]);
      i++
    }
  }
  
  //Sök genom färg array
  i = 0
  if(farfilter[0] !== ""){
    while(i < farfilter.length){
      allFilteredDrinks.push(farfiltering(farfilter[i]))
      filter.push(farfilter[i]);
      i++
    }
  }
  
  //Sök genom smak array
  i = 0
  if(smafilter[0] !== ""){
    while(i < smafilter.length){
      allFilteredDrinks.push(smafiltering(smafilter[i]))
      filter.push(smafilter[i]);
      i++
    }
  }
  console.log(allFilteredDrinks)

  //Skapar en ny array för sista filtreringen 
  let finalDrinks = []
  

  //Går igenom alla arrays i allFilteredDrinks och kollar om id matchar 
  //Om det gör det, lägger in den i finalDrinks
  //Om man söker tomm aå kommer alla drinkar upp
  if(basfilter[0] === "" && ingfilter[0] === "" && farfilter[0] === "" && smafilter[0] === ""){
    finalDrinks = drinks;
   // valda = "Alla drinkar"
  }else{
    if(allFilteredDrinks.length === 1){
      finalDrinks = allFilteredDrinks[0]
    }else{
      finalDrinks = allFilteredDrinks[0].filter(d=> allFilteredDrinks[1].some(e => d.id === e.id))
      for(let i = 0; i < allFilteredDrinks.length-2; ++i){
        finalDrinks = finalDrinks.filter(d=> allFilteredDrinks[i+2].some(e => d.id === e.id))
      }
    }
  }

  //Sorterar resultatet i bokstavsordning
  finalDrinks.sort(function (a, b) {
    return a.drink_name.localeCompare(b.drink_name); //using String.prototype.localCompare()
  });

  // valda = basfilter.join(', ')
  // valda = valda + ", " + ingfilter.join(', ')

  
  console.log(finalDrinks)

  return (
    <div className='screen'>
      <div className='headerLine'/>
      <div className='header'>
        <Link to='/Filter'>
          <button className='back-button'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </button>
        </Link>
        <h2  className='headertext'>FILTRERADE DRINKAR</h2>
      </div>
      <div className='content'>
        <p className = 'visar'>{filter.map(f => <span>{f}</span>)}</p>
        {finalDrinks.map( d => <Drink name={d.drink_name} id={d.id} data = {d} image = {d.picture}/>)}
      </div>
    </div>
  )
}

export default Result