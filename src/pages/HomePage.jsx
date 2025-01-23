import React from 'react'
import RecipeList from '../components/recipes/RecipeList'
import Filters from '../components/filters/Filters'

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E3EEEE] via-[#C5C5CB] to-[#9DAAAA]">
      <div className="px-40 mx-auto">
        <div className="text-center py-12">
          <h1 className="text-4xl font-memoirs text-gray-800 mb-6">
            Bienvenue sur Let's Cook
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Découvrez nos meilleures recettes de cuisine
          </p>
          <div>
            <Filters />
          </div>
        </div>
        <RecipeList />
      </div>
    </main>
  )
}

export default HomePage

// import React from 'react'
// import RecipeList from '../components/recipes/RecipeList'

// const Home = () => {
//   return (
//     <main className="container mx-auto min-h-screen ">
//       <div className="text-center py-8">
//                 <h1 className="text-4xl font-memoirs text-gray-800 mb-6">
//           Bienvenue sur Let's Cook
//           </h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Découvrez nos meilleures recettes de cuisine
//         </p>
//       </div>
//       <RecipeList />
//     </main>
//   )
// }

// export default Home
