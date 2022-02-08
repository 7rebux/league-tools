import './ProfileBadge.sass'

function ProfileBadge() {
  return (
    <div className={'badge ' + this.props.color}>
      <div className='outer'>
        <div className='inner'>
          <img className='icon' src={this.props.icon} />
          <span className='text'>{this.props.text}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileBadge
