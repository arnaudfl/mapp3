const renderProfileCard = (marker: any) => {
    const { id, title, city, description, bg, img, stack, hobbies, social, coords } = marker;
    
    let socialTemplate: any = ``
    if (social.linkedin) {
        socialTemplate += `
        <a href="https://www.linkedin.com/in/${social.linkedin}">
        <i class="fab fa-linkedin"></i>
        </a>
        `;
    }
    if (social.github) {
        socialTemplate += `
        <a href="https://github.com/${social.github}">
        <i class="fab fa-github"></i>
        </a>
        `;
    }
    if (social.twitter) {
        socialTemplate += `
        <a href="https://twitter.com/${social.twitter}">
        <i class="fab fa-twitter"></i>
        </a>
        `
    }

    let stackTemplate: any = ``
    stack.forEach((element: string) => {
        if (!!stackTemplate) {
            stackTemplate += `&nbsp;&bull;&nbsp;`
        }
        stackTemplate += `
        <span class="fab fa-${element}"></span>&nbsp;${element.toUpperCase()}
        `
    });
    
    const sidebarTemplate = `
    <div class="card">
    <div class="cover-photo" style="background-image:url('${bg}');">
    <img src="${img.src}" alt="" class="profile" />
    </div>
    <div class="marker-id">${city}</div>
    <div class="profile-name">${title}</div>
    <p class="about">${description}</p>
    <div class="stack">
    ${stackTemplate}
    </div>
    <p class="hobbies">Hobbies : ${hobbies}</p>
    <div>
    ${socialTemplate}
    </div>
    </div>
    `;
    
    return sidebarTemplate;
}

export default renderProfileCard;
