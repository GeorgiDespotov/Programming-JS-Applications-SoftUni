import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFurnitureById, deleteFurniture } from '../api/data.js';

const itemTemplate = (item, onDelete, isOwner) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        ${isOwner ? html`
        <div>
            <a href=${`/edit/${item._id}`} class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>` : ''}
    </div>
</div>`;

export async function detailsPage(ctx) {
    console.log(ctx);
    const id = ctx.params.id;
    const item = await getFurnitureById(id);
    const userId = sessionStorage.getItem('userId');

    ctx.render(itemTemplate(item, onDelete, item._ownerId == userId));

    async function onDelete() {
        const confirmed = confirm('Are you sure!');

        if (confirmed) {
            await deleteFurniture(id);
            ctx.page.redirect('/');
        }

    }
}