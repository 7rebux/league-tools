export interface SummonerIconProps {
    /**
     * The id of the icon
     */
    iconId: number;
    /**
     * The summoner availability (Is not rendered if undefined)
     */
    availability?: 'chat' | 'away' | 'dnd' | 'mobile' | 'offline';
    /**
     * Whether the icon is favoured
     */
    favorite?: boolean;
    /**
     * Whether the icon is selected
     */
    selected?: boolean;
    /**
     * The width and height of the icon
     */
    size?: number;
}
