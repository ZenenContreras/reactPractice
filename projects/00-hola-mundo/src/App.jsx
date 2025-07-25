import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'

export function App(){

    const users = [
        {
            userName: 'zenencontreras',
            name: 'zenen contreras',
            initialIsFollowing :  true
        },
        {
            userName: 'Zenen',
            name: 'zenen contreras',
            initialIsFollowing :  true
        },
        {
            userName: 'zenenc',
            name: 'zenen contreras',
            initialIsFollowing :  false
        }
    ]

    return (
        <section className='App'>
            {
                users.map(({userName, name, initialIsFollowing}) =>(
                    <TwitterFollowCard 
                    userName={userName} 
                    name={name}
                    initialIsFollowing={initialIsFollowing}  
                    key={userName}
                    />
                ))

            }
        </section> 

    )
}

