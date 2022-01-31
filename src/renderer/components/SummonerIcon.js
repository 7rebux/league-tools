function SummonerIcon(props) {
    return (
        <img className="summoner-icon" src={`http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/${props.profileIconId}.png`}></img>
    )
}

export default SummonerIcon