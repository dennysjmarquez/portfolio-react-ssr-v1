import React, {Component} from 'react';

import './css/Mascot.css';

class Mascot extends Component {
  componentDidMount() {
    window.addEventListener('mousemove', this.mascotAnime);
    window.addEventListener('scroll', () => this.mascotAnime());
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mascotAnime);
    window.removeEventListener('scroll', this.onScroll);
  }

  mascotAnime(event) {
    const mascot = document.querySelector('.mascot');
    const {left, top} = mascot.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const mascotX = Math.min(
       Math.max((event ? event.pageX - scrollLeft : document.body.offsetWidth) - (left + 29.5), -8),
       8
    );
    const mascotY = Math.min(Math.max((event ? event.pageY - scrollTop : scrollTop) - (top - 29.5), 34), 76);

    mascot.style.textIndent = `${mascotX}px`;
    mascot.style.lineHeight = `${mascotY}px`;
  }

  render() {
    return (
       <div className="mascot-wrap">
         <div className="mascot">◕‿‿◕</div>
       </div>
    );
  }
}

export default Mascot;
