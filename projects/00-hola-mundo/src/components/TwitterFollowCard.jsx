import { useState } from "react"

export function TwitterFollowCard({ userName ='Unknown', name, initialIsFollowing}){

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const textFollow = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }


    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                className='tw-followCard-img'

                src = {`https://unavatar.io/${userName}`} alt="avatar de prueba" />
                <div>
                    <strong>{name}</strong>
                    <span>@{userName}</span>
                </div>
            </header>
            
            <aside>
                <button onClick={handleClick} className= {buttonClassName}>
                    <span className="tw-followCard-follow">{textFollow}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>

        </article>
    )
}