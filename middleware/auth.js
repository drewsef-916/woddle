export default function (context) {
    if (context.route.fullPath === "/" || context.route.fullPath === "/auth") {
        console.log('route ok for all users')
    } else {
        console.log('only signed in users can visit here')
    };
    console.log("current user email: " + context.store.state.currentUser.email);
}