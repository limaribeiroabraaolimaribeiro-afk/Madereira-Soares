/* ================================================
   MADEIREIRA SOARES - Sistema Administrativo
   Armazenamento: localStorage
   ================================================ */

// ==================== UTILITÁRIOS ====================

function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function formatarMoeda(valor) {
    return 'R$ ' + Number(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatarData(data) {
    if (!data) return '-';
    var partes = data.split('-');
    if (partes.length === 3) return partes[2] + '/' + partes[1] + '/' + partes[0];
    return data;
}

function dataHoje() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function getStatusClass(status) {
    var mapa = {
        'Aprovado': 'aprovado',
        'Em produção': 'producao',
        'Aguardando': 'aguardando',
        'Orçamento': 'orcamento',
        'Pronto': 'pronto',
        'Entregue': 'entregue',
        'Cancelado': 'cancelado'
    };
    return mapa[status] || '';
}

function toast(msg, tipo) {
    var container = document.getElementById('toastContainer');
    var el = document.createElement('div');
    el.className = 'toast ' + (tipo || '');
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(function () { el.remove(); }, 3500);
}

// ==================== ARMAZENAMENTO ====================

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
        return [];
    }
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getConfig() {
    try {
        return JSON.parse(localStorage.getItem('ms_config')) || {};
    } catch (e) {
        return {};
    }
}

function setConfig(config) {
    localStorage.setItem('ms_config', JSON.stringify(config));
}

// ==================== NAVEGAÇÃO ====================

function navigateTo(page) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });

    var pageEl = document.getElementById('page-' + page);
    var navEl = document.querySelector('[data-page="' + page + '"]');
    if (pageEl) pageEl.classList.add('active');
    if (navEl) navEl.classList.add('active');

    // Fechar sidebar mobile
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('show');

    // Renderizar dados da página
    switch (page) {
        case 'dashboard': renderDashboard(); break;
        case 'clientes': renderClientes(); break;
        case 'pedidos': renderPedidos(); break;
        case 'produtos': renderProdutos(); break;
        case 'despesas': renderDespesas(); break;
        case 'relatorios': renderRelatorios(); break;
        case 'configuracoes': renderConfiguracoes(); break;
    }
}

// Event listeners de navegação
document.querySelectorAll('.nav-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(this.getAttribute('data-page'));
    });
});

// Toggle sidebar mobile
document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('show');
});

document.getElementById('sidebarOverlay').addEventListener('click', function () {
    document.getElementById('sidebar').classList.remove('open');
    this.classList.remove('show');
});

// ==================== MODAIS ====================

function abrirModal(id) {
    document.getElementById(id).classList.add('show');
}

function fecharModal(id) {
    document.getElementById(id).classList.remove('show');
}

// Fechar modal ao clicar fora
document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('show');
    });
});

// ==================== DADOS DE EXEMPLO ====================

function seedDados() {
    if (localStorage.getItem('ms_seeded')) return;

    var clientes = [
        { id: gerarId(), nome: 'Construtora Horizonte LTDA', doc: '32.456.789/0001-12', telefone: '(31) 99999-0001', endereco: 'Rua das Palmeiras, 450 - Belo Horizonte/MG', cidade: 'Belo Horizonte - MG', obs: 'Cliente desde 2020' },
        { id: gerarId(), nome: 'Madeplan Móveis Planejados', doc: '18.765.432/0001-98', telefone: '(31) 98888-1111', endereco: 'Av. Industrial, 780 - Contagem/MG', cidade: 'Contagem - MG', obs: 'Compra mensal' },
        { id: gerarId(), nome: 'João Carlos Teixeira', doc: '045.123.456-78', telefone: '(31) 97777-2222', endereco: 'Rua São Paulo, 90 - Betim/MG', cidade: 'Betim - MG', obs: '' },
        { id: gerarId(), nome: 'Marcenaria do Lauro', doc: '29.876.543/0001-66', telefone: '(31) 96666-3333', endereco: 'Rua da Madeira, 33 - Ibirité/MG', cidade: 'Ibirité - MG', obs: 'Pagamento sempre via Pix' },
        { id: gerarId(), nome: 'Engemax Construções', doc: '11.222.333/0001-44', telefone: '(31) 95555-4444', endereco: 'Av. das Américas, 1200 - Ribeirão das Neves/MG', cidade: 'Ribeirão das Neves - MG', obs: '' }
    ];
    setData('ms_clientes', clientes);

    var produtos = [
        { id: gerarId(), nome: 'Madeira de Pinus Bruta', unidade: 'm³', preco: 280.00, estoque: 120 },
        { id: gerarId(), nome: 'Madeira de Pinus Beneficiada', unidade: 'm³', preco: 420.00, estoque: 85 },
        { id: gerarId(), nome: 'Madeira de Pinus Tratada', unidade: 'm³', preco: 520.00, estoque: 60 },
        { id: gerarId(), nome: 'Madeira de Eucalipto Bruta', unidade: 'm³', preco: 350.00, estoque: 95 },
        { id: gerarId(), nome: 'Madeira de Eucalipto Beneficiada', unidade: 'm³', preco: 480.00, estoque: 45 },
        { id: gerarId(), nome: 'Porta Lisa', unidade: 'Unidade', preco: 189.90, estoque: 40 },
        { id: gerarId(), nome: 'Porta Maciça', unidade: 'Unidade', preco: 650.00, estoque: 15 },
        { id: gerarId(), nome: 'Caixilho', unidade: 'Unidade', preco: 85.00, estoque: 70 },
        { id: gerarId(), nome: 'Vista', unidade: 'Metro', preco: 18.50, estoque: 200 },
        { id: gerarId(), nome: 'Mesa de Madeira Maciça', unidade: 'Unidade', preco: 1890.00, estoque: 5 },
        { id: gerarId(), nome: 'Cadeira', unidade: 'Unidade', preco: 320.00, estoque: 24 },
        { id: gerarId(), nome: 'Banqueta', unidade: 'Unidade', preco: 180.00, estoque: 30 }
    ];
    setData('ms_produtos', produtos);

    var pedidos = [
        {
            id: gerarId(), numero: '000156', clienteId: clientes[0].id, clienteNome: clientes[0].nome,
            data: '2025-05-24', itens: [
                { produtoId: produtos[0].id, produtoNome: produtos[0].nome, unidade: produtos[0].unidade, qtd: 10, valorUnit: 280, desconto: 0 },
                { produtoId: produtos[5].id, produtoNome: produtos[5].nome, unidade: produtos[5].unidade, qtd: 8, valorUnit: 189.90, desconto: 0 }
            ],
            desconto: 0, pagamento: 'Boleto', status: 'Aprovado', obs: 'Entrega em 5 dias úteis'
        },
        {
            id: gerarId(), numero: '000155', clienteId: clientes[2].id, clienteNome: clientes[2].nome,
            data: '2025-05-23', itens: [
                { produtoId: produtos[6].id, produtoNome: produtos[6].nome, unidade: produtos[6].unidade, qtd: 3, valorUnit: 650, desconto: 0 },
                { produtoId: produtos[7].id, produtoNome: produtos[7].nome, unidade: produtos[7].unidade, qtd: 5, valorUnit: 85, desconto: 0 }
            ],
            desconto: 0, pagamento: 'Pix', status: 'Em produção', obs: ''
        },
        {
            id: gerarId(), numero: '000154', clienteId: clientes[1].id, clienteNome: clientes[1].nome,
            data: '2025-05-22', itens: [
                { produtoId: produtos[1].id, produtoNome: produtos[1].nome, unidade: produtos[1].unidade, qtd: 5, valorUnit: 420, desconto: 0 },
                { produtoId: produtos[4].id, produtoNome: produtos[4].nome, unidade: produtos[4].unidade, qtd: 3, valorUnit: 480, desconto: 0 },
                { produtoId: produtos[8].id, produtoNome: produtos[8].nome, unidade: produtos[8].unidade, qtd: 4, valorUnit: 18.50, desconto: 0 }
            ],
            desconto: 100, pagamento: 'Cartão', status: 'Aguardando', obs: 'Aguardando confirmação de endereço'
        },
        {
            id: gerarId(), numero: '000153', clienteId: clientes[4].id, clienteNome: clientes[4].nome,
            data: '2025-05-21', itens: [
                { produtoId: produtos[0].id, produtoNome: produtos[0].nome, unidade: produtos[0].unidade, qtd: 20, valorUnit: 280, desconto: 0 },
                { produtoId: produtos[2].id, produtoNome: produtos[2].nome, unidade: produtos[2].unidade, qtd: 15, valorUnit: 520, desconto: 0 },
                { produtoId: produtos[5].id, produtoNome: produtos[5].nome, unidade: produtos[5].unidade, qtd: 10, valorUnit: 189.90, desconto: 100 }
            ],
            desconto: 200, pagamento: 'Boleto', status: 'Entregue', obs: 'Obra na Av. Central'
        },
        {
            id: gerarId(), numero: '000152', clienteId: clientes[3].id, clienteNome: clientes[3].nome,
            data: '2025-05-20', itens: [
                { produtoId: produtos[3].id, produtoNome: produtos[3].nome, unidade: produtos[3].unidade, qtd: 4, valorUnit: 350, desconto: 0 },
                { produtoId: produtos[10].id, produtoNome: produtos[10].nome, unidade: produtos[10].unidade, qtd: 2, valorUnit: 320, desconto: 0 }
            ],
            desconto: 0, pagamento: 'Pix', status: 'Cancelado', obs: 'Cliente desistiu'
        }
    ];
    setData('ms_pedidos', pedidos);

    var despesas = [
        { id: gerarId(), descricao: 'Compra de madeira bruta (fornecedor)', categoria: 'Material', valor: 28500, data: '2025-05-20', pagamento: 'Boleto', obs: 'Fornecedor Minas Madeiras' },
        { id: gerarId(), descricao: 'Frete caminhão - BH a Contagem', categoria: 'Transporte', valor: 1800, data: '2025-05-18', pagamento: 'Pix', obs: '' },
        { id: gerarId(), descricao: 'Salários - Maio 2025', categoria: 'Funcionário', valor: 24500, data: '2025-05-05', pagamento: 'Transferência', obs: '7 funcionários' },
        { id: gerarId(), descricao: 'Conta de energia - Maio', categoria: 'Energia', valor: 3200, data: '2025-05-10', pagamento: 'Boleto', obs: 'Galpão principal' },
        { id: gerarId(), descricao: 'Manutenção serra circular', categoria: 'Manutenção', valor: 1850, data: '2025-05-15', pagamento: 'Dinheiro', obs: '' },
        { id: gerarId(), descricao: 'Compra de verniz e selador', categoria: 'Material', valor: 4200, data: '2025-05-12', pagamento: 'Cartão', obs: '' },
        { id: gerarId(), descricao: 'Diesel para empilhadeira', categoria: 'Transporte', valor: 980, data: '2025-05-22', pagamento: 'Cartão', obs: '' },
        { id: gerarId(), descricao: 'Material de escritório', categoria: 'Outros', valor: 320, data: '2025-05-08', pagamento: 'Pix', obs: '' }
    ];
    setData('ms_despesas', despesas);

    var config = {
        razao: 'Madeireira Soares LTDA',
        cnpj: '12.345.678/0001-90',
        telefone: '(31) 99999-0000',
        endereco: 'Rua das Madeiras, 123 - Belo Horizonte/MG',
        email: 'contato@madeireirasoares.com.br'
    };
    setConfig(config);

    localStorage.setItem('ms_seeded', 'true');
    localStorage.setItem('ms_nextPedido', '157');
}

// ==================== DASHBOARD ====================

function renderDashboard() {
    var pedidos = getData('ms_pedidos');
    var clientes = getData('ms_clientes');
    var despesas = getData('ms_despesas');

    var totalVendas = 0;
    pedidos.forEach(function (p) {
        if (p.status !== 'Cancelado') totalVendas += calcTotalPedidoObj(p);
    });

    var totalDespesas = 0;
    despesas.forEach(function (d) { totalDespesas += Number(d.valor); });

    document.getElementById('statVendas').textContent = formatarMoeda(totalVendas);
    document.getElementById('statDespesas').textContent = formatarMoeda(totalDespesas);
    document.getElementById('statPedidos').textContent = pedidos.length;
    document.getElementById('statClientes').textContent = clientes.length;

    document.getElementById('statVendasChange').innerHTML = '&#9650; 18,6% vs mês anterior';
    document.getElementById('statDespesasChange').innerHTML = '&#9660; 7,3% vs mês anterior';
    document.getElementById('statPedidosChange').innerHTML = '&#9650; 12,5% vs mês anterior';
    document.getElementById('statClientesChange').innerHTML = '&#9650; 8,1% vs mês anterior';

    // Pedidos recentes (5 últimos)
    var tbody = document.getElementById('dashPedidos');
    tbody.innerHTML = '';
    var recentPedidos = pedidos.slice(0, 5);
    recentPedidos.forEach(function (p) {
        var totalItens = 0;
        p.itens.forEach(function (i) { totalItens += Number(i.qtd); });
        var total = calcTotalPedidoObj(p);
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><span class="pedido-num" onclick="verDetalhesPedido(\'' + p.id + '\')">#' + p.numero + '</span></td>' +
            '<td>' + escapeHtml(p.clienteNome) + '</td>' +
            '<td>' + formatarData(p.data) + '</td>' +
            '<td>' + totalItens + ' itens</td>' +
            '<td>' + formatarMoeda(total) + '</td>' +
            '<td><span class="status-badge ' + getStatusClass(p.status) + '">' + p.status + '</span></td>' +
            '<td><button class="btn-icon" onclick="verDetalhesPedido(\'' + p.id + '\')">&#8942;</button></td>';
        tbody.appendChild(tr);
    });

    // Clientes cadastrados (5 últimos)
    var tbodyC = document.getElementById('dashClientes');
    tbodyC.innerHTML = '';
    var recentClientes = clientes.slice(0, 5);
    recentClientes.forEach(function (c) {
        var ultimaCompra = getUltimaCompra(c.id);
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + escapeHtml(c.nome) + '</td>' +
            '<td>' + escapeHtml(c.doc || '-') + '</td>' +
            '<td>' + escapeHtml(c.telefone || '-') + '</td>' +
            '<td>' + escapeHtml(c.cidade || '-') + '</td>' +
            '<td>' + formatarData(ultimaCompra) + '</td>';
        tbodyC.appendChild(tr);
    });
}

function getUltimaCompra(clienteId) {
    var pedidos = getData('ms_pedidos');
    var ultima = '';
    pedidos.forEach(function (p) {
        if (p.clienteId === clienteId && p.status !== 'Cancelado') {
            if (!ultima || p.data > ultima) ultima = p.data;
        }
    });
    return ultima;
}

function calcTotalPedidoObj(pedido) {
    var total = 0;
    pedido.itens.forEach(function (item) {
        total += (Number(item.qtd) * Number(item.valorUnit)) - Number(item.desconto || 0);
    });
    total -= Number(pedido.desconto || 0);
    return Math.max(0, total);
}

function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== CLIENTES ====================

function abrirModalCliente(id) {
    document.getElementById('clienteId').value = '';
    document.getElementById('clienteNome').value = '';
    document.getElementById('clienteDoc').value = '';
    document.getElementById('clienteTelefone').value = '';
    document.getElementById('clienteEndereco').value = '';
    document.getElementById('clienteCidade').value = '';
    document.getElementById('clienteObs').value = '';
    document.getElementById('modalClienteTitulo').textContent = 'Novo Cliente';

    if (id) {
        var clientes = getData('ms_clientes');
        var c = clientes.find(function (x) { return x.id === id; });
        if (c) {
            document.getElementById('modalClienteTitulo').textContent = 'Editar Cliente';
            document.getElementById('clienteId').value = c.id;
            document.getElementById('clienteNome').value = c.nome;
            document.getElementById('clienteDoc').value = c.doc || '';
            document.getElementById('clienteTelefone').value = c.telefone || '';
            document.getElementById('clienteEndereco').value = c.endereco || '';
            document.getElementById('clienteCidade').value = c.cidade || '';
            document.getElementById('clienteObs').value = c.obs || '';
        }
    }
    abrirModal('modalCliente');
}

function salvarCliente() {
    var nome = document.getElementById('clienteNome').value.trim();
    if (!nome) { toast('Preencha o nome do cliente', 'error'); return; }

    var clientes = getData('ms_clientes');
    var id = document.getElementById('clienteId').value;

    var dados = {
        nome: nome,
        doc: document.getElementById('clienteDoc').value.trim(),
        telefone: document.getElementById('clienteTelefone').value.trim(),
        endereco: document.getElementById('clienteEndereco').value.trim(),
        cidade: document.getElementById('clienteCidade').value.trim(),
        obs: document.getElementById('clienteObs').value.trim()
    };

    if (id) {
        var idx = clientes.findIndex(function (x) { return x.id === id; });
        if (idx >= 0) {
            dados.id = id;
            clientes[idx] = dados;
        }
        toast('Cliente atualizado com sucesso!', 'success');
    } else {
        dados.id = gerarId();
        clientes.unshift(dados);
        toast('Cliente cadastrado com sucesso!', 'success');
    }

    setData('ms_clientes', clientes);
    fecharModal('modalCliente');
    renderClientes();
    renderDashboard();
}

function excluirCliente(id) {
    if (!confirm('Deseja excluir este cliente?')) return;
    var clientes = getData('ms_clientes').filter(function (x) { return x.id !== id; });
    setData('ms_clientes', clientes);
    toast('Cliente excluído', 'success');
    renderClientes();
    renderDashboard();
}

function renderClientes() {
    var clientes = getData('ms_clientes');
    var filtro = (document.getElementById('filtroCliente') ? document.getElementById('filtroCliente').value : '').toLowerCase();

    if (filtro) {
        clientes = clientes.filter(function (c) {
            return (c.nome + ' ' + c.doc + ' ' + c.cidade + ' ' + c.telefone).toLowerCase().indexOf(filtro) >= 0;
        });
    }

    var tbody = document.getElementById('tabelaClientes');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (clientes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">&#128101;</div><p>Nenhum cliente encontrado</p></div></td></tr>';
        return;
    }

    clientes.forEach(function (c) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><strong>' + escapeHtml(c.nome) + '</strong></td>' +
            '<td>' + escapeHtml(c.doc || '-') + '</td>' +
            '<td>' + escapeHtml(c.telefone || '-') + '</td>' +
            '<td>' + escapeHtml(c.cidade || '-') + '</td>' +
            '<td>' + escapeHtml(c.obs || '-') + '</td>' +
            '<td><div class="action-btns">' +
            '<button class="btn-icon" title="Editar" onclick="abrirModalCliente(\'' + c.id + '\')">&#9998;</button>' +
            '<button class="btn-icon" title="Excluir" onclick="excluirCliente(\'' + c.id + '\')">&#128465;</button>' +
            '</div></td>';
        tbody.appendChild(tr);
    });
}

// ==================== PRODUTOS ====================

function abrirModalProduto(id) {
    document.getElementById('produtoId').value = '';
    document.getElementById('produtoNome').value = '';
    document.getElementById('produtoUnidade').value = 'Unidade';
    document.getElementById('produtoPreco').value = '';
    document.getElementById('produtoEstoque').value = '';
    document.getElementById('modalProdutoTitulo').textContent = 'Novo Produto';

    if (id) {
        var produtos = getData('ms_produtos');
        var p = produtos.find(function (x) { return x.id === id; });
        if (p) {
            document.getElementById('modalProdutoTitulo').textContent = 'Editar Produto';
            document.getElementById('produtoId').value = p.id;
            document.getElementById('produtoNome').value = p.nome;
            document.getElementById('produtoUnidade').value = p.unidade;
            document.getElementById('produtoPreco').value = p.preco;
            document.getElementById('produtoEstoque').value = p.estoque || '';
        }
    }
    abrirModal('modalProduto');
}

function salvarProduto() {
    var nome = document.getElementById('produtoNome').value.trim();
    var preco = document.getElementById('produtoPreco').value;
    if (!nome || !preco) { toast('Preencha nome e preço do produto', 'error'); return; }

    var produtos = getData('ms_produtos');
    var id = document.getElementById('produtoId').value;

    var dados = {
        nome: nome,
        unidade: document.getElementById('produtoUnidade').value,
        preco: parseFloat(preco),
        estoque: document.getElementById('produtoEstoque').value ? parseInt(document.getElementById('produtoEstoque').value) : null
    };

    if (id) {
        var idx = produtos.findIndex(function (x) { return x.id === id; });
        if (idx >= 0) {
            dados.id = id;
            produtos[idx] = dados;
        }
        toast('Produto atualizado com sucesso!', 'success');
    } else {
        dados.id = gerarId();
        produtos.unshift(dados);
        toast('Produto cadastrado com sucesso!', 'success');
    }

    setData('ms_produtos', produtos);
    fecharModal('modalProduto');
    renderProdutos();
}

function excluirProduto(id) {
    if (!confirm('Deseja excluir este produto?')) return;
    var produtos = getData('ms_produtos').filter(function (x) { return x.id !== id; });
    setData('ms_produtos', produtos);
    toast('Produto excluído', 'success');
    renderProdutos();
}

function renderProdutos() {
    var produtos = getData('ms_produtos');
    var filtro = (document.getElementById('filtroProduto') ? document.getElementById('filtroProduto').value : '').toLowerCase();

    if (filtro) {
        produtos = produtos.filter(function (p) {
            return p.nome.toLowerCase().indexOf(filtro) >= 0;
        });
    }

    var tbody = document.getElementById('tabelaProdutos');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (produtos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">&#128230;</div><p>Nenhum produto encontrado</p></div></td></tr>';
        return;
    }

    produtos.forEach(function (p) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><strong>' + escapeHtml(p.nome) + '</strong></td>' +
            '<td>' + escapeHtml(p.unidade) + '</td>' +
            '<td>' + formatarMoeda(p.preco) + '</td>' +
            '<td>' + (p.estoque != null ? p.estoque : '-') + '</td>' +
            '<td><div class="action-btns">' +
            '<button class="btn-icon" title="Editar" onclick="abrirModalProduto(\'' + p.id + '\')">&#9998;</button>' +
            '<button class="btn-icon" title="Excluir" onclick="excluirProduto(\'' + p.id + '\')">&#128465;</button>' +
            '</div></td>';
        tbody.appendChild(tr);
    });
}

// ==================== DESPESAS ====================

function abrirModalDespesa(id) {
    document.getElementById('despesaId').value = '';
    document.getElementById('despesaDescricao').value = '';
    document.getElementById('despesaCategoria').value = 'Material';
    document.getElementById('despesaValor').value = '';
    document.getElementById('despesaData').value = dataHoje();
    document.getElementById('despesaPagamento').value = 'Pix';
    document.getElementById('despesaObs').value = '';
    document.getElementById('modalDespesaTitulo').textContent = 'Nova Despesa';

    if (id) {
        var despesas = getData('ms_despesas');
        var d = despesas.find(function (x) { return x.id === id; });
        if (d) {
            document.getElementById('modalDespesaTitulo').textContent = 'Editar Despesa';
            document.getElementById('despesaId').value = d.id;
            document.getElementById('despesaDescricao').value = d.descricao;
            document.getElementById('despesaCategoria').value = d.categoria;
            document.getElementById('despesaValor').value = d.valor;
            document.getElementById('despesaData').value = d.data;
            document.getElementById('despesaPagamento').value = d.pagamento || 'Pix';
            document.getElementById('despesaObs').value = d.obs || '';
        }
    }
    abrirModal('modalDespesa');
}

function salvarDespesa() {
    var descricao = document.getElementById('despesaDescricao').value.trim();
    var valor = document.getElementById('despesaValor').value;
    var data = document.getElementById('despesaData').value;
    if (!descricao || !valor || !data) { toast('Preencha os campos obrigatórios', 'error'); return; }

    var despesas = getData('ms_despesas');
    var id = document.getElementById('despesaId').value;

    var dados = {
        descricao: descricao,
        categoria: document.getElementById('despesaCategoria').value,
        valor: parseFloat(valor),
        data: data,
        pagamento: document.getElementById('despesaPagamento').value,
        obs: document.getElementById('despesaObs').value.trim()
    };

    if (id) {
        var idx = despesas.findIndex(function (x) { return x.id === id; });
        if (idx >= 0) {
            dados.id = id;
            despesas[idx] = dados;
        }
        toast('Despesa atualizada!', 'success');
    } else {
        dados.id = gerarId();
        despesas.unshift(dados);
        toast('Despesa registrada!', 'success');
    }

    setData('ms_despesas', despesas);
    fecharModal('modalDespesa');
    renderDespesas();
    renderDashboard();
}

function excluirDespesa(id) {
    if (!confirm('Deseja excluir esta despesa?')) return;
    var despesas = getData('ms_despesas').filter(function (x) { return x.id !== id; });
    setData('ms_despesas', despesas);
    toast('Despesa excluída', 'success');
    renderDespesas();
    renderDashboard();
}

function renderDespesas() {
    var despesas = getData('ms_despesas');
    var filtro = (document.getElementById('filtroDespesa') ? document.getElementById('filtroDespesa').value : '').toLowerCase();
    var filtroCategoria = document.getElementById('filtroCategoriaDespesa') ? document.getElementById('filtroCategoriaDespesa').value : '';

    if (filtro) {
        despesas = despesas.filter(function (d) {
            return d.descricao.toLowerCase().indexOf(filtro) >= 0;
        });
    }
    if (filtroCategoria) {
        despesas = despesas.filter(function (d) { return d.categoria === filtroCategoria; });
    }

    var tbody = document.getElementById('tabelaDespesas');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (despesas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">&#128176;</div><p>Nenhuma despesa encontrada</p></div></td></tr>';
        return;
    }

    despesas.forEach(function (d) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + escapeHtml(d.descricao) + '</td>' +
            '<td><span class="status-badge orcamento">' + d.categoria + '</span></td>' +
            '<td style="color:var(--red); font-weight:600">' + formatarMoeda(d.valor) + '</td>' +
            '<td>' + formatarData(d.data) + '</td>' +
            '<td>' + escapeHtml(d.pagamento || '-') + '</td>' +
            '<td><div class="action-btns">' +
            '<button class="btn-icon" title="Editar" onclick="abrirModalDespesa(\'' + d.id + '\')">&#9998;</button>' +
            '<button class="btn-icon" title="Excluir" onclick="excluirDespesa(\'' + d.id + '\')">&#128465;</button>' +
            '</div></td>';
        tbody.appendChild(tr);
    });
}

// ==================== PEDIDOS ====================

function getNextPedidoNum() {
    var num = parseInt(localStorage.getItem('ms_nextPedido') || '100');
    localStorage.setItem('ms_nextPedido', String(num + 1));
    return String(num).padStart(6, '0');
}

function abrirModalPedido(id) {
    document.getElementById('pedidoId').value = '';
    document.getElementById('pedidoData').value = dataHoje();
    document.getElementById('pedidoDesconto').value = '0';
    document.getElementById('pedidoPagamento').value = 'Pix';
    document.getElementById('pedidoStatus').value = 'Orçamento';
    document.getElementById('pedidoObs').value = '';
    document.getElementById('pedidoTotalValor').textContent = 'R$ 0,00';
    document.getElementById('modalPedidoTitulo').textContent = 'Novo Pedido';

    // Preencher select de clientes
    var clientes = getData('ms_clientes');
    var selectCliente = document.getElementById('pedidoCliente');
    selectCliente.innerHTML = '<option value="">Selecione o cliente</option>';
    clientes.forEach(function (c) {
        selectCliente.innerHTML += '<option value="' + c.id + '">' + escapeHtml(c.nome) + '</option>';
    });

    // Limpar itens
    document.getElementById('pedidoItens').innerHTML = '';

    if (id) {
        var pedidos = getData('ms_pedidos');
        var p = pedidos.find(function (x) { return x.id === id; });
        if (p) {
            document.getElementById('modalPedidoTitulo').textContent = 'Editar Pedido #' + p.numero;
            document.getElementById('pedidoId').value = p.id;
            document.getElementById('pedidoCliente').value = p.clienteId;
            document.getElementById('pedidoData').value = p.data;
            document.getElementById('pedidoDesconto').value = p.desconto || 0;
            document.getElementById('pedidoPagamento').value = p.pagamento;
            document.getElementById('pedidoStatus').value = p.status;
            document.getElementById('pedidoObs').value = p.obs || '';

            p.itens.forEach(function (item) {
                addItemPedido(item);
            });
        }
    } else {
        addItemPedido();
    }

    abrirModal('modalPedido');
}

function addItemPedido(itemData) {
    var container = document.getElementById('pedidoItens');
    var produtos = getData('ms_produtos');
    var rowId = gerarId();

    var div = document.createElement('div');
    div.className = 'item-row';
    div.id = 'item-' + rowId;

    var optionsProdutos = '<option value="">Selecione</option>';
    produtos.forEach(function (p) {
        var selected = (itemData && itemData.produtoId === p.id) ? ' selected' : '';
        optionsProdutos += '<option value="' + p.id + '" data-preco="' + p.preco + '" data-unidade="' + p.unidade + '"' + selected + '>' + escapeHtml(p.nome) + '</option>';
    });

    div.innerHTML =
        '<div class="form-group"><label>Produto</label><select class="item-produto" onchange="onProdutoChange(this, \'' + rowId + '\')">' + optionsProdutos + '</select></div>' +
        '<div class="form-group" style="flex:0.5"><label>Qtd</label><input type="number" class="item-qtd" min="1" value="' + (itemData ? itemData.qtd : 1) + '" oninput="calcTotalPedido()"></div>' +
        '<div class="form-group" style="flex:0.7"><label>Valor Unit.</label><input type="number" class="item-valor" step="0.01" min="0" value="' + (itemData ? itemData.valorUnit : '') + '" oninput="calcTotalPedido()"></div>' +
        '<div class="form-group" style="flex:0.5"><label>Desc.</label><input type="number" class="item-desconto" step="0.01" min="0" value="' + (itemData ? (itemData.desconto || 0) : 0) + '" oninput="calcTotalPedido()"></div>' +
        '<button class="item-remove" type="button" onclick="removeItemPedido(\'' + rowId + '\')">&times;</button>';

    container.appendChild(div);
    calcTotalPedido();
}

function onProdutoChange(select, rowId) {
    var option = select.options[select.selectedIndex];
    var preco = option.getAttribute('data-preco') || '';
    var row = document.getElementById('item-' + rowId);
    if (row) {
        row.querySelector('.item-valor').value = preco;
    }
    calcTotalPedido();
}

function removeItemPedido(rowId) {
    var el = document.getElementById('item-' + rowId);
    if (el) el.remove();
    calcTotalPedido();
}

function calcTotalPedido() {
    var total = 0;
    document.querySelectorAll('#pedidoItens .item-row').forEach(function (row) {
        var qtd = parseFloat(row.querySelector('.item-qtd').value) || 0;
        var valor = parseFloat(row.querySelector('.item-valor').value) || 0;
        var desc = parseFloat(row.querySelector('.item-desconto').value) || 0;
        total += (qtd * valor) - desc;
    });
    var descontoGeral = parseFloat(document.getElementById('pedidoDesconto').value) || 0;
    total -= descontoGeral;
    total = Math.max(0, total);
    document.getElementById('pedidoTotalValor').textContent = formatarMoeda(total);
}

function salvarPedido() {
    var clienteId = document.getElementById('pedidoCliente').value;
    if (!clienteId) { toast('Selecione um cliente', 'error'); return; }

    var itens = [];
    var valido = true;
    document.querySelectorAll('#pedidoItens .item-row').forEach(function (row) {
        var select = row.querySelector('.item-produto');
        var produtoId = select.value;
        if (!produtoId) { valido = false; return; }
        var option = select.options[select.selectedIndex];
        itens.push({
            produtoId: produtoId,
            produtoNome: option.textContent,
            unidade: option.getAttribute('data-unidade') || '',
            qtd: parseFloat(row.querySelector('.item-qtd').value) || 1,
            valorUnit: parseFloat(row.querySelector('.item-valor').value) || 0,
            desconto: parseFloat(row.querySelector('.item-desconto').value) || 0
        });
    });

    if (!valido || itens.length === 0) { toast('Adicione pelo menos um produto ao pedido', 'error'); return; }

    var clientes = getData('ms_clientes');
    var cliente = clientes.find(function (c) { return c.id === clienteId; });

    var pedidos = getData('ms_pedidos');
    var id = document.getElementById('pedidoId').value;

    var dados = {
        clienteId: clienteId,
        clienteNome: cliente ? cliente.nome : 'Cliente não encontrado',
        data: document.getElementById('pedidoData').value || dataHoje(),
        itens: itens,
        desconto: parseFloat(document.getElementById('pedidoDesconto').value) || 0,
        pagamento: document.getElementById('pedidoPagamento').value,
        status: document.getElementById('pedidoStatus').value,
        obs: document.getElementById('pedidoObs').value.trim()
    };

    if (id) {
        var idx = pedidos.findIndex(function (x) { return x.id === id; });
        if (idx >= 0) {
            dados.id = id;
            dados.numero = pedidos[idx].numero;
            pedidos[idx] = dados;
        }
        toast('Pedido atualizado!', 'success');
    } else {
        dados.id = gerarId();
        dados.numero = getNextPedidoNum();
        pedidos.unshift(dados);
        toast('Pedido criado com sucesso!', 'success');
    }

    setData('ms_pedidos', pedidos);
    fecharModal('modalPedido');
    renderPedidos();
    renderDashboard();
}

function alterarStatusPedido(id, novoStatus) {
    var pedidos = getData('ms_pedidos');
    var idx = pedidos.findIndex(function (x) { return x.id === id; });
    if (idx >= 0) {
        pedidos[idx].status = novoStatus;
        setData('ms_pedidos', pedidos);
        toast('Status atualizado para: ' + novoStatus, 'success');
        renderPedidos();
        renderDashboard();
    }
}

function excluirPedido(id) {
    if (!confirm('Deseja excluir este pedido?')) return;
    var pedidos = getData('ms_pedidos').filter(function (x) { return x.id !== id; });
    setData('ms_pedidos', pedidos);
    toast('Pedido excluído', 'success');
    renderPedidos();
    renderDashboard();
}

function renderPedidos() {
    var pedidos = getData('ms_pedidos');
    var filtro = (document.getElementById('filtroPedido') ? document.getElementById('filtroPedido').value : '').toLowerCase();
    var filtroStatus = document.getElementById('filtroStatusPedido') ? document.getElementById('filtroStatusPedido').value : '';

    if (filtro) {
        pedidos = pedidos.filter(function (p) {
            return (p.numero + ' ' + p.clienteNome).toLowerCase().indexOf(filtro) >= 0;
        });
    }
    if (filtroStatus) {
        pedidos = pedidos.filter(function (p) { return p.status === filtroStatus; });
    }

    var tbody = document.getElementById('tabelaPedidos');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">&#128203;</div><p>Nenhum pedido encontrado</p></div></td></tr>';
        return;
    }

    pedidos.forEach(function (p) {
        var totalItens = 0;
        p.itens.forEach(function (i) { totalItens += Number(i.qtd); });
        var total = calcTotalPedidoObj(p);
        var tr = document.createElement('tr');

        var statusOptions = ['Orçamento', 'Em produção', 'Pronto', 'Entregue', 'Cancelado'];
        var selectHtml = '<select class="status-select" onchange="alterarStatusPedido(\'' + p.id + '\', this.value)">';
        statusOptions.forEach(function (s) {
            selectHtml += '<option value="' + s + '"' + (p.status === s ? ' selected' : '') + '>' + s + '</option>';
        });
        selectHtml += '</select>';

        tr.innerHTML = '<td><span class="pedido-num" onclick="verDetalhesPedido(\'' + p.id + '\')">#' + p.numero + '</span></td>' +
            '<td>' + escapeHtml(p.clienteNome) + '</td>' +
            '<td>' + formatarData(p.data) + '</td>' +
            '<td>' + totalItens + ' itens</td>' +
            '<td><strong>' + formatarMoeda(total) + '</strong></td>' +
            '<td>' + escapeHtml(p.pagamento) + '</td>' +
            '<td>' + selectHtml + '</td>' +
            '<td><div class="action-btns">' +
            '<button class="btn-icon" title="Ver detalhes" onclick="verDetalhesPedido(\'' + p.id + '\')">&#128065;</button>' +
            '<button class="btn-icon" title="Editar" onclick="abrirModalPedido(\'' + p.id + '\')">&#9998;</button>' +
            '<button class="btn-icon" title="Excluir" onclick="excluirPedido(\'' + p.id + '\')">&#128465;</button>' +
            '</div></td>';
        tbody.appendChild(tr);
    });
}

// ==================== DETALHES DO PEDIDO ====================

function verDetalhesPedido(id) {
    var pedidos = getData('ms_pedidos');
    var p = pedidos.find(function (x) { return x.id === id; });
    if (!p) return;

    var clientes = getData('ms_clientes');
    var cliente = clientes.find(function (c) { return c.id === p.clienteId; });
    var total = calcTotalPedidoObj(p);

    var html = '<div class="detalhe-section">' +
        '<h3>Pedido #' + p.numero + '</h3>' +
        '<div class="detalhe-row"><span>Status:</span> <span class="status-badge ' + getStatusClass(p.status) + '">' + p.status + '</span></div>' +
        '<div class="detalhe-row"><span>Data:</span> <span>' + formatarData(p.data) + '</span></div>' +
        '<div class="detalhe-row"><span>Pagamento:</span> <span>' + escapeHtml(p.pagamento) + '</span></div>' +
        '</div>';

    html += '<div class="detalhe-section">' +
        '<h3>Cliente</h3>' +
        '<div class="detalhe-row"><span>Nome:</span> <span>' + escapeHtml(p.clienteNome) + '</span></div>';
    if (cliente) {
        html += '<div class="detalhe-row"><span>CPF/CNPJ:</span> <span>' + escapeHtml(cliente.doc || '-') + '</span></div>' +
            '<div class="detalhe-row"><span>Telefone:</span> <span>' + escapeHtml(cliente.telefone || '-') + '</span></div>' +
            '<div class="detalhe-row"><span>Endereço:</span> <span>' + escapeHtml(cliente.endereco || '-') + '</span></div>';
    }
    html += '</div>';

    html += '<div class="detalhe-section"><h3>Itens</h3>' +
        '<div class="table-wrapper"><table class="table"><thead><tr><th>Produto</th><th>Qtd</th><th>Unit.</th><th>Desc.</th><th>Subtotal</th></tr></thead><tbody>';
    p.itens.forEach(function (item) {
        var subtotal = (Number(item.qtd) * Number(item.valorUnit)) - Number(item.desconto || 0);
        html += '<tr><td>' + escapeHtml(item.produtoNome) + '</td>' +
            '<td>' + item.qtd + ' ' + (item.unidade || '') + '</td>' +
            '<td>' + formatarMoeda(item.valorUnit) + '</td>' +
            '<td>' + formatarMoeda(item.desconto || 0) + '</td>' +
            '<td>' + formatarMoeda(subtotal) + '</td></tr>';
    });
    html += '</tbody></table></div>';
    if (p.desconto > 0) {
        html += '<div class="detalhe-row"><span>Desconto geral:</span> <span style="color:var(--red)">- ' + formatarMoeda(p.desconto) + '</span></div>';
    }
    html += '<div class="detalhe-total">Total: ' + formatarMoeda(total) + '</div>';
    html += '</div>';

    if (p.obs) {
        html += '<div class="detalhe-section"><h3>Observação</h3><p style="font-size:13px; color:var(--text-secondary)">' + escapeHtml(p.obs) + '</p></div>';
    }

    document.getElementById('detalhesPedidoBody').innerHTML = html;

    document.getElementById('btnImprimirDetalhe').setAttribute('onclick', 'imprimirPedido("' + p.id + '")');
    document.getElementById('btnPreNotaDetalhe').setAttribute('onclick', 'gerarPreNota("' + p.id + '")');

    abrirModal('modalDetalhesPedido');
}

// ==================== IMPRESSÃO ====================

function abrirImpressaoPedido() {
    abrirSelecionarPedido('Selecionar Pedido para Imprimir', function (id) { imprimirPedido(id); });
}

function abrirPreNota() {
    abrirSelecionarPedido('Selecionar Pedido para Pré-nota', function (id) { gerarPreNota(id); });
}

function abrirSelecionarPedido(titulo, callback) {
    var pedidos = getData('ms_pedidos');
    if (pedidos.length === 0) { toast('Nenhum pedido cadastrado', 'error'); return; }

    document.getElementById('modalSelecionarTitulo').textContent = titulo;
    var select = document.getElementById('selectPedidoAcao');
    select.innerHTML = '';
    pedidos.forEach(function (p) {
        select.innerHTML += '<option value="' + p.id + '">#' + p.numero + ' - ' + escapeHtml(p.clienteNome) + ' - ' + formatarMoeda(calcTotalPedidoObj(p)) + '</option>';
    });

    document.getElementById('btnConfirmarSelecaoPedido').onclick = function () {
        fecharModal('modalSelecionarPedido');
        callback(select.value);
    };

    abrirModal('modalSelecionarPedido');
}

function imprimirPedido(id) {
    var pedidos = getData('ms_pedidos');
    var p = pedidos.find(function (x) { return x.id === id; });
    if (!p) return;

    fecharModal('modalDetalhesPedido');

    var config = getConfig();
    var clientes = getData('ms_clientes');
    var cliente = clientes.find(function (c) { return c.id === p.clienteId; });
    var total = calcTotalPedidoObj(p);

    var html = '<div class="print-header">' +
        '<img src="img/Logo.png" alt="Logo">' +
        '<h1>' + escapeHtml(config.razao || 'Madeireira Soares LTDA') + '</h1>' +
        '<p>CNPJ: ' + escapeHtml(config.cnpj || '12.345.678/0001-90') + ' | ' + escapeHtml(config.telefone || '') + '</p>' +
        '<p>' + escapeHtml(config.endereco || '') + '</p>' +
        '</div>';

    html += '<div class="print-section"><h3>PEDIDO #' + p.numero + ' | Data: ' + formatarData(p.data) + ' | Status: ' + p.status + '</h3></div>';

    html += '<div class="print-section"><h3>DADOS DO CLIENTE</h3>' +
        '<p><strong>Nome:</strong> ' + escapeHtml(p.clienteNome) + '</p>';
    if (cliente) {
        html += '<p><strong>CPF/CNPJ:</strong> ' + escapeHtml(cliente.doc || '-') + '</p>' +
            '<p><strong>Telefone:</strong> ' + escapeHtml(cliente.telefone || '-') + '</p>' +
            '<p><strong>Endereço:</strong> ' + escapeHtml(cliente.endereco || '-') + '</p>';
    }
    html += '</div>';

    html += '<div class="print-section"><h3>PRODUTOS</h3>' +
        '<table><thead><tr><th>Produto</th><th>Qtd</th><th>Unidade</th><th>Valor Unit.</th><th>Desconto</th><th>Subtotal</th></tr></thead><tbody>';
    p.itens.forEach(function (item) {
        var subtotal = (Number(item.qtd) * Number(item.valorUnit)) - Number(item.desconto || 0);
        html += '<tr><td>' + escapeHtml(item.produtoNome) + '</td>' +
            '<td>' + item.qtd + '</td>' +
            '<td>' + (item.unidade || '-') + '</td>' +
            '<td>' + formatarMoeda(item.valorUnit) + '</td>' +
            '<td>' + formatarMoeda(item.desconto || 0) + '</td>' +
            '<td>' + formatarMoeda(subtotal) + '</td></tr>';
    });
    html += '</tbody></table>';
    if (p.desconto > 0) html += '<p><strong>Desconto geral:</strong> - ' + formatarMoeda(p.desconto) + '</p>';
    html += '</div>';

    html += '<div class="print-total">TOTAL: ' + formatarMoeda(total) + '</div>';
    html += '<p><strong>Forma de pagamento:</strong> ' + escapeHtml(p.pagamento) + '</p>';
    if (p.obs) html += '<p><strong>Observação:</strong> ' + escapeHtml(p.obs) + '</p>';

    html += '<div class="print-signature">' +
        '<div><div class="sig-line">Madeireira Soares</div></div>' +
        '<div><div class="sig-line">Assinatura do Cliente</div></div>' +
        '</div>';

    document.getElementById('printArea').innerHTML = html;
    setTimeout(function () { window.print(); }, 300);
}

function gerarPreNota(id) {
    var pedidos = getData('ms_pedidos');
    var p = pedidos.find(function (x) { return x.id === id; });
    if (!p) return;

    fecharModal('modalDetalhesPedido');

    var config = getConfig();
    var clientes = getData('ms_clientes');
    var cliente = clientes.find(function (c) { return c.id === p.clienteId; });
    var total = calcTotalPedidoObj(p);

    var html = '<div class="print-header">' +
        '<img src="img/Logo.png" alt="Logo">' +
        '<h1>PRÉ-NOTA / RESUMO FISCAL</h1>' +
        '<p>DOCUMENTO DEMONSTRATIVO - SEM VALOR FISCAL</p>' +
        '</div>';

    html += '<div class="print-section"><h3>DADOS DO EMITENTE</h3>' +
        '<p><strong>Razão Social:</strong> ' + escapeHtml(config.razao || 'Madeireira Soares LTDA') + '</p>' +
        '<p><strong>CNPJ:</strong> ' + escapeHtml(config.cnpj || '12.345.678/0001-90') + '</p>' +
        '<p><strong>Endereço:</strong> ' + escapeHtml(config.endereco || 'Rua das Madeiras, 123 - BH/MG') + '</p>' +
        '<p><strong>Telefone:</strong> ' + escapeHtml(config.telefone || '') + '</p>' +
        '</div>';

    html += '<div class="print-section"><h3>DADOS DO DESTINATÁRIO</h3>' +
        '<p><strong>Nome:</strong> ' + escapeHtml(p.clienteNome) + '</p>';
    if (cliente) {
        html += '<p><strong>CPF/CNPJ:</strong> ' + escapeHtml(cliente.doc || '-') + '</p>' +
            '<p><strong>Endereço:</strong> ' + escapeHtml(cliente.endereco || '-') + '</p>' +
            '<p><strong>Telefone:</strong> ' + escapeHtml(cliente.telefone || '-') + '</p>';
    }
    html += '</div>';

    html += '<div class="print-section"><h3>ITENS</h3>' +
        '<table><thead><tr><th>#</th><th>Produto</th><th>Qtd</th><th>Unidade</th><th>Valor Unit.</th><th>Subtotal</th></tr></thead><tbody>';
    p.itens.forEach(function (item, idx) {
        var subtotal = (Number(item.qtd) * Number(item.valorUnit)) - Number(item.desconto || 0);
        html += '<tr><td>' + (idx + 1) + '</td>' +
            '<td>' + escapeHtml(item.produtoNome) + '</td>' +
            '<td>' + item.qtd + '</td>' +
            '<td>' + (item.unidade || '-') + '</td>' +
            '<td>' + formatarMoeda(item.valorUnit) + '</td>' +
            '<td>' + formatarMoeda(subtotal) + '</td></tr>';
    });
    html += '</tbody></table></div>';

    if (p.desconto > 0) html += '<p><strong>Desconto:</strong> - ' + formatarMoeda(p.desconto) + '</p>';
    html += '<div class="print-total">VALOR TOTAL: ' + formatarMoeda(total) + '</div>';
    html += '<p><strong>Data de emissão:</strong> ' + formatarData(p.data) + '</p>';
    html += '<p><strong>Forma de pagamento:</strong> ' + escapeHtml(p.pagamento) + '</p>';

    html += '<div class="print-aviso">' +
        '<strong>&#9888; ATENÇÃO: MODELO DEMONSTRATIVO</strong><br>' +
        'Este documento NÃO possui validade fiscal. A emissão de nota fiscal real ' +
        'exige integração com sistema/API de nota fiscal autorizada pela SEFAZ. ' +
        'Este é apenas um resumo para controle interno.' +
        '</div>';

    html += '<div class="print-signature">' +
        '<div><div class="sig-line">Madeireira Soares</div></div>' +
        '<div><div class="sig-line">Assinatura do Cliente</div></div>' +
        '</div>';

    document.getElementById('printArea').innerHTML = html;
    setTimeout(function () { window.print(); }, 300);
}

// ==================== RELATÓRIOS ====================

function renderRelatorios() {
    var pedidos = getData('ms_pedidos');
    var despesas = getData('ms_despesas');

    var totalVendas = 0;
    pedidos.forEach(function (p) {
        if (p.status !== 'Cancelado') totalVendas += calcTotalPedidoObj(p);
    });

    var totalDespesas = 0;
    despesas.forEach(function (d) { totalDespesas += Number(d.valor); });

    document.getElementById('relTotalVendas').textContent = formatarMoeda(totalVendas);
    document.getElementById('relTotalDespesas').textContent = formatarMoeda(totalDespesas);
    document.getElementById('relSaldo').textContent = formatarMoeda(totalVendas - totalDespesas);
    document.getElementById('relTotalPedidos').textContent = pedidos.length;

    // Pedidos por status
    var statusCount = {};
    pedidos.forEach(function (p) {
        statusCount[p.status] = (statusCount[p.status] || 0) + 1;
    });
    var maxStatus = Math.max.apply(null, Object.values(statusCount).concat([1]));
    var chartStatus = document.getElementById('chartStatus');
    chartStatus.innerHTML = '';
    Object.keys(statusCount).forEach(function (s) {
        var pct = (statusCount[s] / maxStatus) * 100;
        chartStatus.innerHTML += '<div class="chart-bar-row">' +
            '<span class="chart-bar-label">' + s + '</span>' +
            '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<span class="chart-bar-value">' + statusCount[s] + '</span></div>';
    });

    // Produtos mais vendidos
    var produtoVendas = {};
    pedidos.forEach(function (p) {
        if (p.status !== 'Cancelado') {
            p.itens.forEach(function (item) {
                if (!produtoVendas[item.produtoNome]) {
                    produtoVendas[item.produtoNome] = { qtd: 0, receita: 0 };
                }
                produtoVendas[item.produtoNome].qtd += Number(item.qtd);
                produtoVendas[item.produtoNome].receita += (Number(item.qtd) * Number(item.valorUnit));
            });
        }
    });

    var topProdutos = Object.keys(produtoVendas).map(function (nome) {
        return { nome: nome, qtd: produtoVendas[nome].qtd, receita: produtoVendas[nome].receita };
    }).sort(function (a, b) { return b.receita - a.receita; }).slice(0, 8);

    var tbodyTop = document.getElementById('tabelaTopProdutos');
    tbodyTop.innerHTML = '';
    topProdutos.forEach(function (p) {
        tbodyTop.innerHTML += '<tr><td>' + escapeHtml(p.nome) + '</td><td>' + p.qtd + '</td><td>' + formatarMoeda(p.receita) + '</td></tr>';
    });

    // Despesas por categoria
    var catDespesas = {};
    despesas.forEach(function (d) {
        catDespesas[d.categoria] = (catDespesas[d.categoria] || 0) + Number(d.valor);
    });
    var maxCat = Math.max.apply(null, Object.values(catDespesas).concat([1]));
    var chartDespesas = document.getElementById('chartDespesas');
    chartDespesas.innerHTML = '';
    Object.keys(catDespesas).forEach(function (cat) {
        var pct = (catDespesas[cat] / maxCat) * 100;
        chartDespesas.innerHTML += '<div class="chart-bar-row">' +
            '<span class="chart-bar-label">' + cat + '</span>' +
            '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<span class="chart-bar-value">' + formatarMoeda(catDespesas[cat]) + '</span></div>';
    });

    // Vendas por mês
    var vendasMes = {};
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    pedidos.forEach(function (p) {
        if (p.status !== 'Cancelado' && p.data) {
            var mesIdx = parseInt(p.data.split('-')[1]) - 1;
            var mesNome = meses[mesIdx] || 'N/A';
            vendasMes[mesNome] = (vendasMes[mesNome] || 0) + calcTotalPedidoObj(p);
        }
    });
    var maxVendaMes = Math.max.apply(null, Object.values(vendasMes).concat([1]));
    var chartVendasMes = document.getElementById('chartVendasMes');
    chartVendasMes.innerHTML = '';
    Object.keys(vendasMes).forEach(function (mes) {
        var pct = (vendasMes[mes] / maxVendaMes) * 100;
        chartVendasMes.innerHTML += '<div class="chart-bar-row">' +
            '<span class="chart-bar-label">' + mes + '</span>' +
            '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<span class="chart-bar-value">' + formatarMoeda(vendasMes[mes]) + '</span></div>';
    });
}

// ==================== CONFIGURAÇÕES ====================

function renderConfiguracoes() {
    var config = getConfig();
    document.getElementById('cfgRazao').value = config.razao || 'Madeireira Soares LTDA';
    document.getElementById('cfgCnpj').value = config.cnpj || '12.345.678/0001-90';
    document.getElementById('cfgTelefone').value = config.telefone || '';
    document.getElementById('cfgEndereco').value = config.endereco || '';
    document.getElementById('cfgEmail').value = config.email || '';

    document.getElementById('cfgQtdClientes').textContent = getData('ms_clientes').length;
    document.getElementById('cfgQtdProdutos').textContent = getData('ms_produtos').length;
    document.getElementById('cfgQtdPedidos').textContent = getData('ms_pedidos').length;
    document.getElementById('cfgQtdDespesas').textContent = getData('ms_despesas').length;
}

function salvarConfig() {
    setConfig({
        razao: document.getElementById('cfgRazao').value,
        cnpj: document.getElementById('cfgCnpj').value,
        telefone: document.getElementById('cfgTelefone').value,
        endereco: document.getElementById('cfgEndereco').value,
        email: document.getElementById('cfgEmail').value
    });
    toast('Configurações salvas!', 'success');
}

function limparTodosDados() {
    if (!confirm('ATENÇÃO: Isso vai apagar TODOS os dados (clientes, pedidos, produtos, despesas). Deseja continuar?')) return;
    if (!confirm('Tem certeza? Esta ação não pode ser desfeita.')) return;
    localStorage.removeItem('ms_clientes');
    localStorage.removeItem('ms_pedidos');
    localStorage.removeItem('ms_produtos');
    localStorage.removeItem('ms_despesas');
    localStorage.removeItem('ms_seeded');
    localStorage.removeItem('ms_nextPedido');
    toast('Todos os dados foram apagados', 'success');
    seedDados();
    renderDashboard();
    renderConfiguracoes();
}

// ==================== BUSCA GLOBAL ====================

function executarBusca(inputEl, resultsEl) {
    var query = inputEl.value.toLowerCase().trim();

    if (query.length < 2) {
        resultsEl.classList.remove('show');
        resultsEl.innerHTML = '';
        return;
    }

    var results = [];

    getData('ms_clientes').forEach(function (c) {
        if ((c.nome + ' ' + c.doc + ' ' + c.cidade).toLowerCase().indexOf(query) >= 0) {
            results.push({ tipo: 'CLIENTE', texto: c.nome, acao: function () { navigateTo('clientes'); } });
        }
    });

    getData('ms_pedidos').forEach(function (p) {
        if (('#' + p.numero + ' ' + p.clienteNome).toLowerCase().indexOf(query) >= 0) {
            results.push({ tipo: 'PEDIDO', texto: '#' + p.numero + ' - ' + p.clienteNome, acao: function () { navigateTo('pedidos'); verDetalhesPedido(p.id); } });
        }
    });

    getData('ms_produtos').forEach(function (p) {
        if (p.nome.toLowerCase().indexOf(query) >= 0) {
            results.push({ tipo: 'PRODUTO', texto: p.nome + ' - ' + formatarMoeda(p.preco), acao: function () { navigateTo('produtos'); } });
        }
    });

    resultsEl.innerHTML = '';
    if (results.length === 0) {
        resultsEl.innerHTML = '<div class="search-result-item" style="color:var(--text-light)">Nenhum resultado encontrado</div>';
    } else {
        results.slice(0, 10).forEach(function (r) {
            var item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = '<span class="search-result-type">' + r.tipo + '</span>' + escapeHtml(r.texto);
            item.addEventListener('click', function () {
                resultsEl.classList.remove('show');
                inputEl.value = '';
                r.acao();
            });
            resultsEl.appendChild(item);
        });
    }
    resultsEl.classList.add('show');
}

// Busca desktop
document.getElementById('globalSearch').addEventListener('input', function () {
    executarBusca(this, document.getElementById('searchResults'));
});

// Busca mobile
document.getElementById('globalSearchMobile').addEventListener('input', function () {
    executarBusca(this, document.getElementById('searchResultsMobile'));
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-box')) {
        document.getElementById('searchResults').classList.remove('show');
        document.getElementById('searchResultsMobile').classList.remove('show');
    }
});

// ==================== INICIALIZAÇÃO ====================

seedDados();
renderDashboard();
